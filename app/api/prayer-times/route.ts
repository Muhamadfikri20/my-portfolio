import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://muslimsalat.p.rapidapi.com/Jakarta.json', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '80620b776amshef022486bd4c010p1dc09cjsna3396e80ea37',
        'x-rapidapi-host': 'muslimsalat.p.rapidapi.com'
      }
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    // Return only the necessary data
    return NextResponse.json({
      items: data.items,
      state: data.state,
      country: data.country,
      status: data.status_valid
    })
    
  } catch (error) {
    console.error('Prayer times API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prayer times' },
      { status: 500 }
    )
  }
} 