<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login',
  description: 'Login to your account to continue'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
const isLoading = ref(false)

// Redirect if already logged in
watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})

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
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })

    if (error) throw error
  } catch (error) {
    toast.add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Login failed',
      color: 'red'
    })
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

    navigateTo('/')
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
