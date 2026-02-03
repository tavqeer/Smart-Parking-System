/**
 * Finds the nearest available parking slot based on requirements.
 * 
 * @param {Array} slots - Array of parking slot objects
 * @param {boolean} needsEV - Whether the vehicle needs EV charging
 * @param {boolean} needsCover - Whether the vehicle needs covered parking
 * @returns {Object} - Result object with success status and slot number or error message
 */
export const parkVehicle = (slots, needsEV, needsCover) => {
  // Filter available slots that meet requirements
  const availableSlots = slots.filter(slot => {
    if (slot.isOccupied) return false;
    if (needsEV && !slot.isEVCharging) return false;
    if (needsCover && !slot.isCovered) return false;
    return true;
  });

  // Sort by slot number ascending to find nearest
  availableSlots.sort((a, b) => a.slotNo - b.slotNo);

  if (availableSlots.length === 0) {
    return { success: false, message: "No slot available" };
  }

  // Return the nearest slot (first after sorting)
  const nearestSlot = availableSlots[0];
  return { 
    success: true, 
    slotNo: nearestSlot.slotNo,
    message: `Vehicle parked successfully in slot ${nearestSlot.slotNo}`
  };
};

/**
 * Validates if a slot can be removed (must exist and be occupied).
 * 
 * @param {Array} slots - Array of parking slot objects
 * @param {number} slotNo - The slot number to remove vehicle from
 * @returns {Object} - Result object with success status and message
 */
export const removeVehicle = (slots, slotNo) => {
  const slot = slots.find(s => s.slotNo === slotNo);

  if (!slot) {
    return { success: false, message: `Slot ${slotNo} does not exist` };
  }

  if (!slot.isOccupied) {
    return { success: false, message: `Slot ${slotNo} is already empty` };
  }

  return { success: true, message: `Vehicle removed from slot ${slotNo}` };
};

/**
 * Validates slot addition input.
 * 
 * @param {Array} slots - Array of existing parking slot objects
 * @param {number} slotNo - The slot number to validate
 * @returns {Object} - Result object with success status and error message if invalid
 */
export const validateSlotAddition = (slots, slotNo) => {
  if (slotNo <= 0 || !Number.isInteger(slotNo)) {
    return { valid: false, message: "Slot number must be a positive integer" };
  }

  if (slots.some(s => s.slotNo === slotNo)) {
    return { valid: false, message: `Slot ${slotNo} already exists` };
  }

  return { valid: true };
};
