export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_manager_relationships: {
        Row: {
          agent_id: string
          can_edit: boolean | null
          created_at: string | null
          manager_id: string
        }
        Insert: {
          agent_id: string
          can_edit?: boolean | null
          created_at?: string | null
          manager_id: string
        }
        Update: {
          agent_id?: string
          can_edit?: boolean | null
          created_at?: string | null
          manager_id?: string
        }
        Relationships: []
      }
      agents: {
        Row: {
          a_code: string | null
          id: string
          profile_id: string | null
          role: string | null
        }
        Insert: {
          a_code?: string | null
          id?: string
          profile_id?: string | null
          role?: string | null
        }
        Update: {
          a_code?: string | null
          id?: string
          profile_id?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "agent_profile_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "agents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "agents_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      air_waybill_status_history: {
        Row: {
          air_waybill_id: string
          changed_at: string | null
          changed_by: string | null
          id: string
          notes: string | null
          status_code: string
        }
        Insert: {
          air_waybill_id: string
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          notes?: string | null
          status_code: string
        }
        Update: {
          air_waybill_id?: string
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          notes?: string | null
          status_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "air_waybill_status_history_air_waybill_id_fkey"
            columns: ["air_waybill_id"]
            isOneToOne: false
            referencedRelation: "air_waybills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "air_waybill_status_history_status_code_fkey"
            columns: ["status_code"]
            isOneToOne: false
            referencedRelation: "booking_statuses"
            referencedColumns: ["code"]
          },
        ]
      }
      air_waybills: {
        Row: {
          actual_arrival: string | null
          actual_departure: string | null
          arrival_date: string | null
          awb_number: string
          awb_prefix: string
          booking_id: string | null
          chargeable_weight: number | null
          charges_code: string | null
          charges_prepaid: boolean | null
          cod_amount: number | null
          commodity_description: string | null
          consignee_id: string | null
          contains_dangerous_goods: boolean | null
          created_at: string | null
          created_by: string | null
          currency: string | null
          customs_value: number | null
          declared_value: number | null
          departure_date: string | null
          destination_airport_id: string | null
          dg_declaration_id: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          fhl_message_id: string | null
          first_carrier: string | null
          flight_id: string | null
          fwb_message_id: string | null
          gross_weight: number | null
          handling_instructions: string | null
          id: string
          insurance_amount: number | null
          is_electronic: boolean | null
          is_master_awb: boolean | null
          issue_date: string | null
          master_awb_id: string | null
          notify_party_id: string | null
          number_of_pieces: number | null
          origin_airport_id: string | null
          second_carrier: string | null
          shipper_id: string | null
          signed_at: string | null
          signed_by_shipper: boolean | null
          special_handling_codes: string[] | null
          status: string
          status_code: string | null
          status_timestamp: string | null
          third_carrier: string | null
          transfer_airports: string[] | null
          updated_at: string | null
          volume_weight: number | null
          weight_unit: string | null
        }
        Insert: {
          actual_arrival?: string | null
          actual_departure?: string | null
          arrival_date?: string | null
          awb_number?: string
          awb_prefix: string
          booking_id?: string | null
          chargeable_weight?: number | null
          charges_code?: string | null
          charges_prepaid?: boolean | null
          cod_amount?: number | null
          commodity_description?: string | null
          consignee_id?: string | null
          contains_dangerous_goods?: boolean | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          customs_value?: number | null
          declared_value?: number | null
          departure_date?: string | null
          destination_airport_id?: string | null
          dg_declaration_id?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          fhl_message_id?: string | null
          first_carrier?: string | null
          flight_id?: string | null
          fwb_message_id?: string | null
          gross_weight?: number | null
          handling_instructions?: string | null
          id?: string
          insurance_amount?: number | null
          is_electronic?: boolean | null
          is_master_awb?: boolean | null
          issue_date?: string | null
          master_awb_id?: string | null
          notify_party_id?: string | null
          number_of_pieces?: number | null
          origin_airport_id?: string | null
          second_carrier?: string | null
          shipper_id?: string | null
          signed_at?: string | null
          signed_by_shipper?: boolean | null
          special_handling_codes?: string[] | null
          status?: string
          status_code?: string | null
          status_timestamp?: string | null
          third_carrier?: string | null
          transfer_airports?: string[] | null
          updated_at?: string | null
          volume_weight?: number | null
          weight_unit?: string | null
        }
        Update: {
          actual_arrival?: string | null
          actual_departure?: string | null
          arrival_date?: string | null
          awb_number?: string
          awb_prefix?: string
          booking_id?: string | null
          chargeable_weight?: number | null
          charges_code?: string | null
          charges_prepaid?: boolean | null
          cod_amount?: number | null
          commodity_description?: string | null
          consignee_id?: string | null
          contains_dangerous_goods?: boolean | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          customs_value?: number | null
          declared_value?: number | null
          departure_date?: string | null
          destination_airport_id?: string | null
          dg_declaration_id?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          fhl_message_id?: string | null
          first_carrier?: string | null
          flight_id?: string | null
          fwb_message_id?: string | null
          gross_weight?: number | null
          handling_instructions?: string | null
          id?: string
          insurance_amount?: number | null
          is_electronic?: boolean | null
          is_master_awb?: boolean | null
          issue_date?: string | null
          master_awb_id?: string | null
          notify_party_id?: string | null
          number_of_pieces?: number | null
          origin_airport_id?: string | null
          second_carrier?: string | null
          shipper_id?: string | null
          signed_at?: string | null
          signed_by_shipper?: boolean | null
          special_handling_codes?: string[] | null
          status?: string
          status_code?: string | null
          status_timestamp?: string | null
          third_carrier?: string | null
          transfer_airports?: string[] | null
          updated_at?: string | null
          volume_weight?: number | null
          weight_unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "air_waybills_awb_prefix_fkey"
            columns: ["awb_prefix"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "air_waybills_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "air_waybills_consignee_id_fkey"
            columns: ["consignee_id"]
            isOneToOne: false
            referencedRelation: "consignees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "air_waybills_destination_airport_id_fkey"
            columns: ["destination_airport_id"]
            isOneToOne: false
            referencedRelation: "airports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "air_waybills_dg_declaration_id_fkey"
            columns: ["dg_declaration_id"]
            isOneToOne: false
            referencedRelation: "dangerous_goods_declarations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "air_waybills_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "air_waybills_master_awb_id_fkey"
            columns: ["master_awb_id"]
            isOneToOne: false
            referencedRelation: "air_waybills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "air_waybills_origin_airport_id_fkey"
            columns: ["origin_airport_id"]
            isOneToOne: false
            referencedRelation: "airports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "air_waybills_shipper_id_fkey"
            columns: ["shipper_id"]
            isOneToOne: false
            referencedRelation: "shippers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "air_waybills_status_code_fkey"
            columns: ["status_code"]
            isOneToOne: false
            referencedRelation: "booking_statuses"
            referencedColumns: ["code"]
          },
        ]
      }
      airlines: {
        Row: {
          account_code: string
          active: boolean
          airline_name: string
          alliance: string | null
          country: string | null
          created_at: string
          description: string | null
          email: string | null
          iata_code: string | null
          icao_code: string | null
          id: string
          is_lowcost: boolean | null
          is_lowсost: boolean
          marketing_name: string | null
          phone: string | null
          rus_code: string | null
          russian: boolean
          station_manager: string | null
          updated_at: string
        }
        Insert: {
          account_code: string
          active?: boolean
          airline_name: string
          alliance?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          iata_code?: string | null
          icao_code?: string | null
          id?: string
          is_lowcost?: boolean | null
          is_lowсost?: boolean
          marketing_name?: string | null
          phone?: string | null
          rus_code?: string | null
          russian?: boolean
          station_manager?: string | null
          updated_at?: string
        }
        Update: {
          account_code?: string
          active?: boolean
          airline_name?: string
          alliance?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          iata_code?: string | null
          icao_code?: string | null
          id?: string
          is_lowcost?: boolean | null
          is_lowсost?: boolean
          marketing_name?: string | null
          phone?: string | null
          rus_code?: string | null
          russian?: boolean
          station_manager?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      airports: {
        Row: {
          cntr_code: string | null
          iata: string | null
          id: string
          name: string | null
        }
        Insert: {
          cntr_code?: string | null
          iata?: string | null
          id: string
          name?: string | null
        }
        Update: {
          cntr_code?: string | null
          iata?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      booking_statuses: {
        Row: {
          category: string
          code: string
          description: string
        }
        Insert: {
          category: string
          code: string
          description: string
        }
        Update: {
          category?: string
          code?: string
          description?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          awb_number: string | null
          cargo_description: string | null
          created_at: string | null
          flight_id: string | null
          id: string
          pieces: number | null
          shipper_id: string | null
          status: string | null
          weight_kg: number | null
        }
        Insert: {
          awb_number?: string | null
          cargo_description?: string | null
          created_at?: string | null
          flight_id?: string | null
          id?: string
          pieces?: number | null
          shipper_id?: string | null
          status?: string | null
          weight_kg?: number | null
        }
        Update: {
          awb_number?: string | null
          cargo_description?: string | null
          created_at?: string | null
          flight_id?: string | null
          id?: string
          pieces?: number | null
          shipper_id?: string | null
          status?: string | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flights"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          company_name: string | null
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          role_id: string | null
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          role_id?: string | null
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          role_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      consignees: {
        Row: {
          address: string
          city: string
          contact_email: string | null
          contact_phone: string | null
          country_code: string
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          postal_code: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          city: string
          contact_email?: string | null
          contact_phone?: string | null
          country_code: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          postal_code?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          city?: string
          contact_email?: string | null
          contact_phone?: string | null
          country_code?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          postal_code?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      dangerous_goods_declarations: {
        Row: {
          created_at: string | null
          emergency_contact: string
          emergency_phone: string
          exempt_quantity: boolean | null
          hazard_class: string
          id: string
          limited_quantity: boolean | null
          packing_group: string
          packing_instruction: string
          proper_shipping_name: string
          shipment_id: string
          subsidiary_class: string | null
          un_number: string
        }
        Insert: {
          created_at?: string | null
          emergency_contact: string
          emergency_phone: string
          exempt_quantity?: boolean | null
          hazard_class: string
          id?: string
          limited_quantity?: boolean | null
          packing_group: string
          packing_instruction: string
          proper_shipping_name: string
          shipment_id: string
          subsidiary_class?: string | null
          un_number: string
        }
        Update: {
          created_at?: string | null
          emergency_contact?: string
          emergency_phone?: string
          exempt_quantity?: boolean | null
          hazard_class?: string
          id?: string
          limited_quantity?: boolean | null
          packing_group?: string
          packing_instruction?: string
          proper_shipping_name?: string
          shipment_id?: string
          subsidiary_class?: string | null
          un_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "dangerous_goods_declarations_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      flights: {
        Row: {
          airline_id: string | null
          arrival_airport: string
          arrival_time: string | null
          booked_kg: number | null
          capacity_kg: number | null
          departure_airport: string
          departure_time: string | null
          flight_number: string
          id: string
          status: string | null
        }
        Insert: {
          airline_id?: string | null
          arrival_airport: string
          arrival_time?: string | null
          booked_kg?: number | null
          capacity_kg?: number | null
          departure_airport: string
          departure_time?: string | null
          flight_number: string
          id?: string
          status?: string | null
        }
        Update: {
          airline_id?: string | null
          arrival_airport?: string
          arrival_time?: string | null
          booked_kg?: number | null
          capacity_kg?: number | null
          departure_airport?: string
          departure_time?: string | null
          flight_number?: string
          id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_flights_airline"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
        ]
      }
      handling_events: {
        Row: {
          agent_id: string | null
          awb_id: string
          event_time: string
          event_type: string
          id: string
          location_airport: string | null
          notes: string | null
        }
        Insert: {
          agent_id?: string | null
          awb_id: string
          event_time: string
          event_type: string
          id?: string
          location_airport?: string | null
          notes?: string | null
        }
        Update: {
          agent_id?: string | null
          awb_id?: string
          event_time?: string
          event_type?: string
          id?: string
          location_airport?: string | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "handling_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_profile_view"
            referencedColumns: ["agent_id"]
          },
          {
            foreignKeyName: "handling_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          role_id: string | null
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          role_id?: string | null
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          role_id?: string | null
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      permissions: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          permission_id: string
          role_id: string
        }
        Insert: {
          permission_id: string
          role_id: string
        }
        Update: {
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      shipments: {
        Row: {
          animal_species: string | null
          awb_id: string
          cargo_type: string
          container_type: string | null
          created_at: string | null
          created_by: string | null
          dgr_category: string | null
          hs_code: string | null
          id: string
          is_shared: boolean | null
          live_animals_identifier: string | null
          nature_of_goods: string
          packing_group: string | null
          perishable_category: string | null
          requires_health_certificate: boolean | null
          requires_phyto_certificate: boolean | null
          special_handling_codes: string[] | null
          temperature_range: string | null
          total_pieces: number
          total_volume_cbm: number | null
          total_weight_kg: number
          un_number: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          animal_species?: string | null
          awb_id: string
          cargo_type?: string
          container_type?: string | null
          created_at?: string | null
          created_by?: string | null
          dgr_category?: string | null
          hs_code?: string | null
          id?: string
          is_shared?: boolean | null
          live_animals_identifier?: string | null
          nature_of_goods: string
          packing_group?: string | null
          perishable_category?: string | null
          requires_health_certificate?: boolean | null
          requires_phyto_certificate?: boolean | null
          special_handling_codes?: string[] | null
          temperature_range?: string | null
          total_pieces: number
          total_volume_cbm?: number | null
          total_weight_kg: number
          un_number?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          animal_species?: string | null
          awb_id?: string
          cargo_type?: string
          container_type?: string | null
          created_at?: string | null
          created_by?: string | null
          dgr_category?: string | null
          hs_code?: string | null
          id?: string
          is_shared?: boolean | null
          live_animals_identifier?: string | null
          nature_of_goods?: string
          packing_group?: string | null
          perishable_category?: string | null
          requires_health_certificate?: boolean | null
          requires_phyto_certificate?: boolean | null
          special_handling_codes?: string[] | null
          temperature_range?: string | null
          total_pieces?: number
          total_volume_cbm?: number | null
          total_weight_kg?: number
          un_number?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      shippers: {
        Row: {
          address: string
          city: string
          contact_email: string | null
          contact_phone: string | null
          country_code: string
          created_at: string | null
          created_by: string | null
          iata_code: string | null
          id: string
          name: string
          postal_code: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          city: string
          contact_email?: string | null
          contact_phone?: string | null
          country_code: string
          created_at?: string | null
          created_by?: string | null
          iata_code?: string | null
          id?: string
          name: string
          postal_code?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          city?: string
          contact_email?: string | null
          contact_phone?: string | null
          country_code?: string
          created_at?: string | null
          created_by?: string | null
          iata_code?: string | null
          id?: string
          name?: string
          postal_code?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      special_cargo_details: {
        Row: {
          cargo_type: string
          created_at: string | null
          description: string
          handling_instructions: string
          humidity_requirements: string | null
          id: string
          other_requirements: string | null
          shipment_id: string
          special_identifier: string
          temperature_requirements: string | null
          ventilation_requirements: string | null
        }
        Insert: {
          cargo_type: string
          created_at?: string | null
          description: string
          handling_instructions: string
          humidity_requirements?: string | null
          id?: string
          other_requirements?: string | null
          shipment_id: string
          special_identifier: string
          temperature_requirements?: string | null
          ventilation_requirements?: string | null
        }
        Update: {
          cargo_type?: string
          created_at?: string | null
          description?: string
          handling_instructions?: string
          humidity_requirements?: string | null
          id?: string
          other_requirements?: string | null
          shipment_id?: string
          special_identifier?: string
          temperature_requirements?: string | null
          ventilation_requirements?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "special_cargo_details_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          airline_id: string | null
          created_at: string | null
          full_name: string | null
          phone: string | null
          role_id: string | null
          updated_at: string | null
          user_id: string
          user_pict: string | null
        }
        Insert: {
          airline_id?: string | null
          created_at?: string | null
          full_name?: string | null
          phone?: string | null
          role_id?: string | null
          updated_at?: string | null
          user_id: string
          user_pict?: string | null
        }
        Update: {
          airline_id?: string | null
          created_at?: string | null
          full_name?: string | null
          phone?: string | null
          role_id?: string | null
          updated_at?: string | null
          user_id?: string
          user_pict?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      agent_profile_view: {
        Row: {
          active_awbs: number | null
          agent_code: string | null
          agent_id: string | null
          airline_code: string | null
          airline_name: string | null
          full_name: string | null
          phone: string | null
          profile_created: string | null
          recent_awbs: number | null
          role_name: string | null
          total_awbs: number | null
          user_id: string | null
          user_pict: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_shipper_permission: {
        Args: { user_id: string; shipper_id: string; permission_code: string }
        Returns: boolean
      }
      generate_agent_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_awb_number: {
        Args: { airline_id: string }
        Returns: string
      }
      generate_fwb_telex: {
        Args: { awb_id: string }
        Returns: string
      }
      generate_unique_agent_code: {
        Args: Record<PropertyKey, never> | { profile_id_param: string }
        Returns: string
      }
      get_user_jwt_claims: {
        Args: { user_id: string }
        Returns: Json
      }
      share_shipment: {
        Args: { shipment_id: string; manager_id: string; allow_edit: boolean }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
