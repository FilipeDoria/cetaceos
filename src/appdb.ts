import Dexie from 'dexie'

export class AppDatabase extends Dexie {
  cetaceans: Dexie.Table<Cetacean, number>

  constructor() {
    super('SightingsDatabase')

    const db = this

    //
    // Define tables and indexes
    //
    db.version(1).stores({
      cetaceans: '++id, specie',
    })

    // Let's physically map Contact class to contacts table.
    // This will make it possible to call loadEmailsAndPhones()
    // directly on retrieved database objects.
    db.cetaceans.mapToClass(Cetacean)
  }
}

/* Just for code completion and compilation - defines
 * the interface of objects stored in the cetaceans table.
 */
export class Form {
  company: string
  ship: string
  date: any
  time: any
  seaConditions: any
  latitude: any
  longitude: any

  constructor(company: string, ship: string, date: any, time: any, seaConditions: any, latitude: any, longitude: any) {
    this.company = company
    this.ship = ship
    this.date = date
    this.time = time
    this.seaConditions = seaConditions
    this.latitude = latitude
    this.longitude = longitude
  }
}

export class Cetacean extends Form {
  id?: number
  specie: string
  total: number
  children: number
  behaviour: string
  reaction: string
  otherInfo: string
  otherspecies: string

  constructor(company: string, ship: string, date: Date, time: any, seaConditions: any, latitude: any, longitude: any, specie: string, total: number, children: number, behaviour: string, reaction: string, otherInfo: string, otherspecies: string, id?: number) {
    super(company, ship, date, time, seaConditions, latitude, longitude)
    if (id) this.id = id
    this.specie = specie
    this.total = total
    this.children = children
    this.behaviour = behaviour
    this.reaction = reaction
    this.otherInfo = otherInfo
    this.otherspecies = otherspecies
  }

  save() {
    return db.transaction('rw', db.cetaceans, async() => {
      // Add or update our selves. If add, record this.id.
      this.id = await db.cetaceans.put(this)
    })
  }
}

export var db = new AppDatabase()
