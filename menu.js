var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})

function getSentences(text) {
    return (text.match(/[^.!?]+[.!?]?/g) || []).map(function (sentence) {
        return sentence.trim()
    }).filter(Boolean)
}

function getEnding(sentence) {
    var match = sentence.match(/[.!?]+$/)
    return match ? match[0] : '.'
}

function translateYoda(text) {
    return getSentences(text).map(function (sentence) {
        var ending = getEnding(sentence)
        var body = sentence.replace(/[.!?]+$/, '')
        var nameMatch = body.match(/\bmy name is\s+(.+)$/i)
        if (nameMatch) {
            return nameMatch[1] + ' is my name' + ending
        }

        var verbMatch = body.match(/^(I|you|we|they|he|she|it)\s+(like|love|want|need|know|see|have|can|will)\s+(.+)$/i)
        if (verbMatch) {
            return verbMatch[3] + ' ' + verbMatch[2] + ' ' + verbMatch[1] + ending
        }

        return body + ', hmm' + ending
    }).join(' ')
}

function translatePirate(text) {
    return getSentences(text).map(function (sentence) {
        var ending = getEnding(sentence)
        var body = sentence.replace(/[.!?]+$/, '')
            .replace(/\bhello\b/gi, 'ahoy')
            .replace(/\byou\b/gi, 'ye')
            .replace(/\byour\b/gi, 'yer')
            .replace(/\bfriend\b/gi, 'matey')
        return 'Arrr, ' + body + ' matey' + ending
    }).join(' ')
}

var localTranslators = {
    minion: function (text) {
        return text
            .replace(/\bthank you\b/gi, 'tank yu')
            .replace(/\bhello\b/gi, 'bello')
            .replace(/\byou\b/gi, 'yu')
            .replace(/\bfriends?\b/gi, 'amigo')
    },
    groot: function (text) {
        return getSentences(text).map(function () {
            return 'I am Groot.'
        }).join(' ')
    },
    yoda: translateYoda,
    hodor: function (text) {
        return text.replace(/\b[\w'-]+\b/g, 'Hodor')
    },
    pirate: translatePirate,
    dothraki: function (text) {
        return text
            .replace(/\bthank you\b/gi, 'San athchomari yeraan')
            .replace(/\bi love you\b/gi, 'Anha zhilak yera')
            .replace(/\bhello\b/gi, "M'athchomaroon")
            .replace(/\bhi\b/gi, "M'athchomaroon")
    }
}

var activeCharacter = ''

function func(id) {
    activeCharacter = id
    var character = id.charAt(0).toUpperCase() + id.slice(1)
    document.getElementById('modalTitle').textContent = character + ' Translator'
    document.getElementById('message').value = ''
    document.getElementById('display').textContent = 'Your translated text will display here.....'
}

document.getElementById('translate').addEventListener('click', function () {
    var message = document.getElementById('message')
    var display = document.getElementById('display')
    var text = message.value.trim()
    var translator = localTranslators[activeCharacter]

    if (!text) {
        display.textContent = 'Enter some text to translate.'
        return
    }
    if (!translator) {
        display.textContent = 'Select a character first.'
        return
    }

    display.textContent = translator(text)
    message.value = ''
})
