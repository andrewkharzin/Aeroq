export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
            referencedRelation: "agent_air_waybills"
            referencedColumns: ["id"]
          },
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
            referencedRelation: "agent_air_waybills"
            referencedColumns: ["booking_id"]
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
            referencedRelation: "agent_air_waybills"
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
          account_code: string | null
          active: boolean | null
          airline_name: string | null
          alliance: string | null
          country: string | null
          description: string | null
          email: string | null
          iata_code: string | null
          icao_code: string | null
          id: string
          is_lowcost: boolean | null
          marketing_name: string | null
          phone: string | null
          rus_code: string | null
          russian: boolean | null
          station_manager: string | null
        }
        Insert: {
          account_code?: string | null
          active?: boolean | null
          airline_name?: string | null
          alliance?: string | null
          country?: string | null
          description?: string | null
          email?: string | null
          iata_code?: string | null
          icao_code?: string | null
          id?: string
          is_lowcost?: boolean | null
          marketing_name?: string | null
          phone?: string | null
          rus_code?: string | null
          russian?: boolean | null
          station_manager?: string | null
        }
        Update: {
          account_code?: string | null
          active?: boolean | null
          airline_name?: string | null
          alliance?: string | null
          country?: string | null
          description?: string | null
          email?: string | null
          iata_code?: string | null
          icao_code?: string | null
          id?: string
          is_lowcost?: boolean | null
          marketing_name?: string | null
          phone?: string | null
          rus_code?: string | null
          russian?: boolean | null
          station_manager?: string | null
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
          created_at: string | null
          flight_id: string | null
          id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          flight_id?: string | null
          id?: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          flight_id?: string | null
          id?: string
          status?: string | null
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
          aircraft_type: string | null
          airline_id: string | null
          arrival_airport: string
          arrival_time: string | null
          booked_kg: number | null
          capacity_kg: number | null
          departure_airport: string
          departure_time: string | null
          flight_date: string | null
          flight_number: string
          id: string
          is_cargo: boolean | null
          operation_type: string | null
          original_arrival_time: string | null
          original_departure_time: string | null
          raw_scr_line: string | null
          remarks: string | null
          scr_id: string | null
          status: string | null
        }
        Insert: {
          aircraft_type?: string | null
          airline_id?: string | null
          arrival_airport: string
          arrival_time?: string | null
          booked_kg?: number | null
          capacity_kg?: number | null
          departure_airport: string
          departure_time?: string | null
          flight_date?: string | null
          flight_number: string
          id?: string
          is_cargo?: boolean | null
          operation_type?: string | null
          original_arrival_time?: string | null
          original_departure_time?: string | null
          raw_scr_line?: string | null
          remarks?: string | null
          scr_id?: string | null
          status?: string | null
        }
        Update: {
          aircraft_type?: string | null
          airline_id?: string | null
          arrival_airport?: string
          arrival_time?: string | null
          booked_kg?: number | null
          capacity_kg?: number | null
          departure_airport?: string
          departure_time?: string | null
          flight_date?: string | null
          flight_number?: string
          id?: string
          is_cargo?: boolean | null
          operation_type?: string | null
          original_arrival_time?: string | null
          original_departure_time?: string | null
          raw_scr_line?: string | null
          remarks?: string | null
          scr_id?: string | null
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
          {
            foreignKeyName: "flights_scr_id_fkey"
            columns: ["scr_id"]
            isOneToOne: false
            referencedRelation: "scr_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      flights_errors: {
        Row: {
          error_message: string | null
          error_time: string | null
          id: number
          raw_data: string | null
        }
        Insert: {
          error_message?: string | null
          error_time?: string | null
          id?: number
          raw_data?: string | null
        }
        Update: {
          error_message?: string | null
          error_time?: string | null
          id?: number
          raw_data?: string | null
        }
        Relationships: []
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
      scr_messages: {
        Row: {
          error_message: string | null
          id: string
          processed_at: string | null
          processing_status: string | null
          raw_text: string
          received_at: string
          status: string | null
        }
        Insert: {
          error_message?: string | null
          id?: string
          processed_at?: string | null
          processing_status?: string | null
          raw_text: string
          received_at?: string
          status?: string | null
        }
        Update: {
          error_message?: string | null
          id?: string
          processed_at?: string | null
          processing_status?: string | null
          raw_text?: string
          received_at?: string
          status?: string | null
        }
        Relationships: []
      }
      scr_processing_errors: {
        Row: {
          error_message: string
          error_time: string
          flight_data: Json | null
          id: string
          problem_line: string | null
          scr_id: string | null
        }
        Insert: {
          error_message: string
          error_time?: string
          flight_data?: Json | null
          id?: string
          problem_line?: string | null
          scr_id?: string | null
        }
        Update: {
          error_message?: string
          error_time?: string
          flight_data?: Json | null
          id?: string
          problem_line?: string | null
          scr_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scr_processing_errors_scr_id_fkey"
            columns: ["scr_id"]
            isOneToOne: false
            referencedRelation: "scr_messages"
            referencedColumns: ["id"]
          },
        ]
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
      agent_air_waybills: {
        Row: {
          airline_code: string | null
          arrival_date: string | null
          awb_number: string | null
          booking_created_at: string | null
          booking_id: string | null
          booking_status: string | null
          chargeable_weight: number | null
          commodity_description: string | null
          consignee_name: string | null
          contains_dangerous_goods: boolean | null
          created_at: string | null
          currency: string | null
          declared_value: number | null
          departure_date: string | null
          destination: string | null
          fhl_message_id: string | null
          first_carrier: string | null
          flight_arrival: string | null
          flight_departure: string | null
          flight_number: string | null
          full_awb_number: string | null
          fwb_message_id: string | null
          gross_weight: number | null
          id: string | null
          is_master_awb: boolean | null
          issue_date: string | null
          master_awb_number: string | null
          number_of_pieces: number | null
          origin: string | null
          second_carrier: string | null
          shipper_name: string | null
          signed_at: string | null
          signed_by_shipper: boolean | null
          special_handling_codes: string[] | null
          status: string | null
          status_description: string | null
          third_carrier: string | null
          updated_at: string | null
          weight_unit: string | null
        }
        Relationships: []
      }
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
      parse_scr_message: {
        Args: { scr_id: string } | { scr_text: string }
        Returns: undefined
      }
      process_scr_messages_listener: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      share_shipment: {
        Args: { shipment_id: string; manager_id: string; allow_edit: boolean }
        Returns: undefined
      }
      sync_all_flight_booked_weights: {
        Args: Record<PropertyKey, never>
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
