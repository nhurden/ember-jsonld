export default {
  LIBRARY: {
    "@context": {
      "dc": "http://purl.org/dc/elements/1.1/",
      "ex": "http://example.org/vocab#",
      "xsd": "http://www.w3.org/2001/XMLSchema#",
      "ex:contains": {
        "@type": "@id"
      }
    },
    "@graph": [
    {
      "@id": "http://example.org/library",
      "@type": "ex:Library",
      "ex:contains": "http://example.org/library/the-republic"
    },
    {
      "@id": "http://example.org/library/the-republic",
      "@type": "ex:Book",
      "dc:creator": "Plato",
      "dc:title": "The Republic",
      "ex:contains": "http://example.org/library/the-republic#introduction"
    },
    {
      "@id": "http://example.org/library/the-republic#introduction",
      "@type": "ex:Chapter",
      "dc:description": "An introductory chapter on The Republic.",
      "dc:title": "The Introduction"
    }
    ]
  },

  LIBRARY_COMPACTED: {
    "@context": {
      "dc": "http://purl.org/dc/elements/1.1/",
      "ex": "http://example.org/vocab#",
      "xsd": "http://www.w3.org/2001/XMLSchema#",
      "ex:contains": {
        "@type": "@id"
      }
    },
    "@graph": [
    {
      "@id": "http://example.org/library",
      "@type": "ex:Library",
      "ex:contains": "http://example.org/library/the-republic"
    },
    {
      "@id": "http://example.org/library/the-republic",
      "@type": "ex:Book",
      "dc:creator": "Plato",
      "dc:title": "The Republic",
      "ex:contains": "http://example.org/library/the-republic#introduction"
    },
    {
      "@id": "http://example.org/library/the-republic#introduction",
      "@type": "ex:Chapter",
      "dc:description": "An introductory chapter on The Republic.",
      "dc:title": "The Introduction"
    }
    ]
  },

  LIBRARY_EXPANDED:
    [
    {
      "@id": "http://example.org/library",
      "@type": [
        "http://example.org/vocab#Library"
      ],
      "http://example.org/vocab#contains": [
      {
        "@id": "http://example.org/library/the-republic"
      }
      ]
    },
    {
      "@id": "http://example.org/library/the-republic",
      "@type": [
        "http://example.org/vocab#Book"
      ],
      "http://purl.org/dc/elements/1.1/creator": [
      {
        "@value": "Plato"
      }
      ],
      "http://purl.org/dc/elements/1.1/title": [
      {
        "@value": "The Republic"
      }
      ],
      "http://example.org/vocab#contains": [
      {
        "@id": "http://example.org/library/the-republic#introduction"
      }
      ]
    },
    {
      "@id": "http://example.org/library/the-republic#introduction",
      "@type": [
        "http://example.org/vocab#Chapter"
      ],
      "http://purl.org/dc/elements/1.1/description": [
      {
        "@value": "An introductory chapter on The Republic."
      }
      ],
      "http://purl.org/dc/elements/1.1/title": [
      {
        "@value": "The Introduction"
      }
      ]
    }
  ],

  LIBRARY_FLATTENED:
  {
    "@context": {
      "dc": "http://purl.org/dc/elements/1.1/",
      "ex": "http://example.org/vocab#",
      "xsd": "http://www.w3.org/2001/XMLSchema#",
      "ex:contains": {
        "@type": "@id"
      }
    },
    "@graph": [
    {
      "@id": "http://example.org/library",
      "@type": "ex:Library",
      "ex:contains": "http://example.org/library/the-republic"
    },
    {
      "@id": "http://example.org/library/the-republic",
      "@type": "ex:Book",
      "ex:contains": "http://example.org/library/the-republic#introduction",
      "dc:creator": "Plato",
      "dc:title": "The Republic"
    },
    {
      "@id": "http://example.org/library/the-republic#introduction",
      "@type": "ex:Chapter",
      "dc:description": "An introductory chapter on The Republic.",
      "dc:title": "The Introduction"
    }
    ]
  },

  LIBRARY_FRAME:
  {
    "@context": {
      "dc": "http://purl.org/dc/elements/1.1/",
      "ex": "http://example.org/vocab#"
    },
    "@type": "ex:Library",
    "ex:contains": {
      "@type": "ex:Book",
      "ex:contains": {
        "@type": "ex:Chapter"
      }
    }
  },

  LIBRARY_FRAMED:
  {
    "@context": {
      "dc": "http://purl.org/dc/elements/1.1/",
      "ex": "http://example.org/vocab#"
    },
    "@graph": [
    {
      "@id": "http://example.org/library",
      "@type": "ex:Library",
      "ex:contains": {
        "@id": "http://example.org/library/the-republic",
        "@type": "ex:Book",
        "ex:contains": {
          "@id": "http://example.org/library/the-republic#introduction",
          "@type": "ex:Chapter",
          "dc:description": "An introductory chapter on The Republic.",
          "dc:title": "The Introduction"
        },
        "dc:creator": "Plato",
        "dc:title": "The Republic"
      }
    }
    ]
  },

  LIBRARY_NQUADS:
    '<http://example.org/library/the-republic#introduction> <http://purl.org/dc/elements/1.1/description> "An introductory chapter on The Republic." .\n' +
    '<http://example.org/library/the-republic#introduction> <http://purl.org/dc/elements/1.1/title> "The Introduction" .\n' +
    '<http://example.org/library/the-republic#introduction> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.org/vocab#Chapter> .\n' +
    '<http://example.org/library/the-republic> <http://example.org/vocab#contains> <http://example.org/library/the-republic#introduction> .\n' +
    '<http://example.org/library/the-republic> <http://purl.org/dc/elements/1.1/creator> "Plato" .\n' +
    '<http://example.org/library/the-republic> <http://purl.org/dc/elements/1.1/title> "The Republic" .\n' +
    '<http://example.org/library/the-republic> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.org/vocab#Book> .\n' +
    '<http://example.org/library> <http://example.org/vocab#contains> <http://example.org/library/the-republic> .\n' +
    '<http://example.org/library> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://example.org/vocab#Library> .\n',

  LIBRARY_INVALID_URL: 'ftp://example.com/index.jsonld'
};
