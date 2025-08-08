import type { Registry } from "../core/types.ts";

// Import all resource definitions
import accountNumberSequences from "./account_number_sequences.ts";
import agentClientTypes from "./agent_client_types.ts";
import agentGroups from "./agent_groups.ts";
import agentToAgentGroups from "./agent_to_agent_groups.ts";
import agentUsers from "./agent_users.ts";
import agents from "./agents.ts";
import airlineProductTypeAttributes from "./airline_product_type_attributes.ts";
import airlineProductTypes from "./airline_product_types.ts";
import airlineTariffs from "./airline_tariffs.ts";
import airlineVolumetricCoefficients from "./airline_volumetric_coefficients.ts";
import airlines from "./airlines.ts";
import awbEvents from "./awb_events.ts";
import awbIataMessageHistory from "./awb_iata_message_history.ts";
import awbIataMessages from "./awb_iata_messages.ts";
import awbIssuedRecords from "./awb_issued_records.ts";
import awbRef from "./awb_ref.ts";
import awbStocks from "./awb_stocks.ts";
import awbs from "./awbs.ts";
import bookingTypes from "./booking_types.ts";
import bookings from "./bookings.ts";
import cargoMeasurements from "./cargo_measurements.ts";
import currency from "./currency.ts";
import location from "./location.ts";
import participant from "./participant.ts";

// Manually register all resources here.
// Keep this file the only place you add imports when creating new resources.
export const registry: Registry = {
  [accountNumberSequences.name]: accountNumberSequences,
  [agentClientTypes.name]: agentClientTypes,
  [agentGroups.name]: agentGroups,
  [agentToAgentGroups.name]: agentToAgentGroups,
  [agentUsers.name]: agentUsers,
  [agents.name]: agents,
  [airlineProductTypeAttributes.name]: airlineProductTypeAttributes,
  [airlineProductTypes.name]: airlineProductTypes,
  [airlineTariffs.name]: airlineTariffs,
  [airlineVolumetricCoefficients.name]: airlineVolumetricCoefficients,
  [airlines.name]: airlines,
  [awbEvents.name]: awbEvents,
  [awbIataMessageHistory.name]: awbIataMessageHistory,
  [awbIataMessages.name]: awbIataMessages,
  [awbIssuedRecords.name]: awbIssuedRecords,
  [awbRef.name]: awbRef,
  [awbStocks.name]: awbStocks,
  [awbs.name]: awbs,
  [bookingTypes.name]: bookingTypes,
  [bookings.name]: bookings,
  [cargoMeasurements.name]: cargoMeasurements,
  [currency.name]: currency,
  [location.name]: location,
  [participant.name]: participant,
};
