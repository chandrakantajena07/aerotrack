export interface AdsbRawAircraft {
  hex: string
  flight?: string
  r?: string
  t?: string
  alt_baro?: number | 'ground'
  gs?: number
  track?: number
  squawk?: string
  lat?: number
  lon?: number
  category?: string
}

export interface Aircraft {
  icao: string
  callsign: string
  registration: string | null
  type: string | null
  lat: number
  lon: number
  headingDeg: number
  altitudeFt: number | 'ground'
  speedKt: number | null
  squawk: string | null
  category: string | null
}

export interface ViewportQuery {
  lat: number
  lon: number
  radiusNm: number
}
