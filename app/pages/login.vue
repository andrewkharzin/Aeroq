<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth',
  middleware: ['anon'] // Используем middleware для анонимных пользователей
})

useSeoMeta({
  title: 'Login',
  description: 'Login to your account to continue'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
const isLoading = ref(false)

// Функция для определения роли и перенаправления
const redirectUserBasedOnRole = async () => {
  try {
    if (!user.value?.id) {
      await new Promise(resolve => setTimeout(resolve, 300))
      if (!user.value?.id) return navigateTo('/')
    }

    // Get user's role with proper error handling
    const profileQuery = await supabase
      .from('user_profiles')
      .select('role_id, roles:role_id (name)')
      .eq('user_id', user.value.id)
      .single()

    if (profileQuery.error) throw profileQuery.error

    // Redirect airline agents
    if (profileQuery.data?.roles?.name === 'airline_agent') {
      const agentQuery = await supabase
        .from('agents')
        .select('id')
        .eq('profile_id', user.value.id)
        .single()

      if (agentQuery.error) throw agentQuery.error
      if (agentQuery.data?.id) {
        return navigateTo(`/agent/${agentQuery.data.id}/dashboard`)
      }
    }

    // Default redirect for others
    return navigateTo('/')

  } catch (error) {
    console.error('Redirect error:', error)
    return navigateTo('/')
  }
}

// Обработчик успешного входа (для OAuth)
watch(user, async (newUser) => {
  if (newUser) {
    await redirectUserBasedOnRole()
  }
}, { immediate: true })

// Form configuration
const fields = [{
  name: 'email',
  type: 'email' as const,
  label: 'Email',
  placeholder: 'Enter your email',
  required: true,
  icon: 'i-heroicons-envelope'
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password',
  required: true,
  icon: 'i-heroicons-lock-closed'
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox' as const
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => signInWithProvider('google')
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => signInWithProvider('github')
}]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

// Authentication methods
async function signInWithProvider(provider: 'google' | 'github') {
  try {
    isLoading.value = true
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) throw error
  } catch (error) {
    toast.add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Login failed',
      color: 'red'
    })
  } finally {
    isLoading.value = false
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true

    const { error } = await supabase.auth.signInWithPassword({
      email: event.data.email,
      password: event.data.password
    })

    if (error) throw error

    toast.add({
      title: 'Success',
      description: 'Logged in successfully',
      color: 'green'
    })

    // После успешного входа перенаправляем пользователя
    await redirectUserBasedOnRole()
  } catch (error) {
    toast.add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Invalid login credentials',
      color: 'red'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <UAuthForm
      :fields="fields"
      :schema="schema"
      title="Welcome"
      description="Sign in to your account to continue"
      icon="i-lucide-lock"
      :loading="isLoading"
      @submit="onSubmit"
    >
      <template #description>
        Don't have an account?
        <ULink
          to="/register"
          class="text-primary font-medium"
        >
          Sign up
        </ULink>
      </template>

      <template #password-hint>
        <ULink
          to="/forgot-password"
          class="text-primary font-medium"
          tabindex="-1"
        >
          Forgot password?
        </ULink>
      </template>

      <template #footer>
        By signing in, you agree to our
        <ULink
          to="/terms"
          class="text-primary font-medium"
        >
          Terms of Service
        </ULink>
      </template>
    </UAuthForm>
  </div>
</template>
