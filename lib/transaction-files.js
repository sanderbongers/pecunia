export function guessBank(file) {
  const HEADER_ROW_ING =
    '"Datum";"Naam / Omschrijving";"Rekening";"Tegenrekening";"Code";"Af Bij";"Bedrag (EUR)";"Mutatiesoort";"Mededelingen";"Saldo na mutatie";"Tag"'

  if (file.startsWith(HEADER_ROW_ING)) {
    return 'ING Bank'
  }

  return false
}

export function transformHeader(header) {
  switch (header) {
    case 'Datum':
      return 'date'
    case 'Naam / Omschrijving':
      return 'description'
    case 'Rekening':
      return 'bank_account'
    case 'Tegenrekening':
      return 'contra_account'
    case 'Code':
      return 'mutation_code'
    case 'Af Bij':
      return 'in_out'
    case 'Bedrag (EUR)':
      return 'amount'
    case 'Mutatiesoort':
      return 'mutation_type'
    case 'Mededelingen':
      return 'remarks'
    case 'Saldo na mutatie':
      return 'balance_after_mutation'
    case 'Tag':
      return 'tag'
    default:
      return header
  }
}
