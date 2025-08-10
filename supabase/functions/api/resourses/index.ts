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
import bookingCustomsSecurity from "./booking_customs_security.ts";
import bookingDensityIndicators from "./booking_density_indicators.ts";
import bookingEawbData from "./booking_eawb_data.ts";
import bookingEawbEvents from "./booking_eawb_events.ts";
import bookingEdiMessages from "./booking_edi_messages.ts";
import bookingSegment from "./booking_segment.ts";
import bookingSegmentFlight from "./booking_segment_flight.ts";
import bookingSpecialHandling from "./booking_special_handling.ts";
import cargoDryIce from "./cargo_dry_ice.ts";
import cargoMarkings from "./cargo_markings.ts";
import cargoPieceSpecialHandling from "./cargo_piece_special_handling.ts";
import cargoPieces from "./cargo_pieces.ts";
import cargoPiecesHistory from "./cargo_pieces_history.ts";
import cargoTypes from "./cargo_types.ts";
import cargoMeasurements from "./cargo_measurements.ts";
import currency from "./currency.ts";
import dangerousGoods from "./dangerous_goods.ts";
import location from "./location.ts";
import participant from "./participant.ts";
import participantAddress from "./participant_address.ts";
import participantContact from "./participant_contact.ts";
import permissions from "./permissions.ts";
import rolePermissions from "./role_permissions.ts";
import roles from "./roles.ts";
import shipmentMeasurements from "./shipment_measurements.ts";
import specialHandlingAttributes from "./special_handling_attributes.ts";
import specialHandlingCodes from "./special_handling_codes.ts";
import userProfile from "./user_profile.ts";
import userRoles from "./user_roles.ts";

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
  [bookingCustomsSecurity.name]: bookingCustomsSecurity,
  [bookingDensityIndicators.name]: bookingDensityIndicators,
  [bookingEawbData.name]: bookingEawbData,
  [bookingEawbEvents.name]: bookingEawbEvents,
  [bookingEdiMessages.name]: bookingEdiMessages,
  [bookingSegment.name]: bookingSegment,
  [bookingSegmentFlight.name]: bookingSegmentFlight,
  [bookingSpecialHandling.name]: bookingSpecialHandling,
  [cargoDryIce.name]: cargoDryIce,
  [cargoMarkings.name]: cargoMarkings,
  [cargoPieceSpecialHandling.name]: cargoPieceSpecialHandling,
  [cargoPieces.name]: cargoPieces,
  [cargoPiecesHistory.name]: cargoPiecesHistory,
  [cargoTypes.name]: cargoTypes,
  [cargoMeasurements.name]: cargoMeasurements,
  [currency.name]: currency,
  [dangerousGoods.name]: dangerousGoods,
  [location.name]: location,
  [participant.name]: participant,
  [participantAddress.name]: participantAddress,
  [participantContact.name]: participantContact,
  [permissions.name]: permissions,
  [rolePermissions.name]: rolePermissions,
  [roles.name]: roles,
  [shipmentMeasurements.name]: shipmentMeasurements,
  [specialHandlingAttributes.name]: specialHandlingAttributes,
  [specialHandlingCodes.name]: specialHandlingCodes,
  [userProfile.name]: userProfile,
  [userRoles.name]: userRoles,
};
