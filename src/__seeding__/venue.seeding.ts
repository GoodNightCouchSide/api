import { Request, Response } from 'express'
import { CREATED } from 'http-status'
import Logging from '../library/Logging'
import VenueModel from '../models/venue.model'

const venues = {
  CASSIOPEIA: {
    name: 'Cassiopeia Club',
    address: {
      street: 'Revaler Str.',
      buildingNumber: '99',
      city: 'Berlin',
      zip: 10245
    },
    description:
      'Nachtclub mit Subkulturflair & Livemusikprogramm in ehemaliger Industriehalle mit Innenhof.'
  },
  SO36: {
    name: 'SO 36',
    address: {
      street: 'Oranienstraße',
      buildingNumber: '190',
      city: 'Berlin',
      zip: 10999
    },
    description: `Das SO36 ist ein Musik-Club in der Oranienstraße 190, 
    nahe dem Rio-Reiser-Platz im Berliner Ortsteil Kreuzberg. 
    Der Club hat seinen Namen vom gleichnamigen historischen Postzustellbezirk Berlin SO 36.`
  },
  ASTRA: {
    name: 'Astra Kulturhaus',
    address: {
      street: 'Revaler Str.',
      buildingNumber: '99',
      city: 'Berlin',
      zip: 10245
    },
    description:
      'Nachtclub & Livekonzertlokal mit Säulenhalle & Discokugeln \
      für Auftritte deutscher & internationaler Künstler.'
  },
  ARENA: {
    name: 'Arena Berlin',
    address: {
      street: 'Eichenstraße',
      buildingNumber: '4',
      city: 'Berlin',
      zip: 12435
    },
    description:
      'Die Arena Berlin ist ein multifunktionelles Veranstaltungsgelände im \
      Berliner Ortsteil Alt-Treptow. Das Gelände mit der Adresse Eichenstraße 4 \
      befindet sich am Flutgraben gegenüber dem Osthafen. \
      Die große Halle, ein ehemaliger ABOAG-Betriebshof, steht unter Denkmalschutz.'
  },
  FESTSAAL: {
    name: 'Festsaal Kreuzberg',
    address: {
      street: 'Am Flutgraben',
      buildingNumber: '4',
      city: 'Berlin',
      zip: 12435
    },
    description:
      'Der neue Festsaal Kreuzberg empfängt Sie seit 2017 am Rande von Treptow, \
      bzw. mitten in Berlin Kreuzberg.'
  },
  COLUMBIAHALLE: {
    name: 'Columbiahalle',
    address: {
      street: 'Columbiadamm',
      buildingNumber: '13-21',
      city: 'Berlin',
      zip: 10965
    },
    description:
      'Die Columbiahalle im Berliner Ortsteil Tempelhof an der Grenze zu Kreuzberg \
      ist ein Veranstaltungsort für Pop- und Rockkonzerte. \
      Die Halle bietet unbestuhlt für 3.500 Besucher Platz, bestuhlt für 1.400.'
  },
  COLUMBIA_THEATER: {
    name: 'Columbia Theater',
    address: {
      street: 'Columbiadamm',
      buildingNumber: '9-11',
      city: 'Berlin',
      zip: 10965
    },
    description:
      'Konzerthalle & Veranstaltungsort in modernistischem Gebäude, \
      für Messen, Festivals & Sportveranstaltungen.'
  },
  SCHOKOLADEN: {
    name: 'Schokoladen e.V.',
    address: {
      street: 'Ackerstraße',
      buildingNumber: '169',
      city: 'Berlin',
      zip: 10115
    },
    description:
      'Das alternative Kulturprojekt bietet Indierock-Konzerte, \
      Theater und Lesungen in ehemaliger Schokoladenfabrik.'
  }
}

const ALL_VENUES_KEYS = Object.keys(venues)

const seedingVenues = (req: Request, res: Response) => {
  VenueModel.insertMany(Object.values(venues)).then((response) => {
    const massage = `Insert ${response.length} Venues to the Database`
    Logging.info(massage)
    res.status(CREATED).send({
      massage
    })
  })
}

export default { seedingVenues, ALL_VENUES_KEYS, ...venues }
