// Fungsi untuk memformat tanggal menjadi DD-MM-YYYY
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
}

// Fungsi untuk memformat waktu menjadi HH:MM WIB
export function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes} WIB`;
}

// currencyHelper.js

// Fungsi untuk memformat angka menjadi format Rupiah menggunakan Intl.NumberFormat
export function formatCurrency(number) {
  // Menggunakan Intl.NumberFormat untuk memformat angka ke Rupiah
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
}

export function calculateTotalSubTotal(transactionDetails) {
  return formatCurrency(transactionDetails.reduce((total, transaction) => total + transaction.subTotal, 0));
}

export function updateDateWithNewTime(originalDate, newTime) {
  // Split the new time into hours and minutes
  let [newHours, newMinutes] = newTime.split(":").map(Number);
  console.log(newHours, newMinutes);

  // Create a new Date object from the original date
  let dateObj = new Date(originalDate);

  // Set the hours and minutes of the new time
  dateObj.setUTCHours(newHours);
  dateObj.setUTCMinutes(newMinutes);
  dateObj.setUTCSeconds(0);
  dateObj.setUTCMilliseconds(0);

  // Convert the Date object back to the ISO string
  return dateObj.toISOString();
}
