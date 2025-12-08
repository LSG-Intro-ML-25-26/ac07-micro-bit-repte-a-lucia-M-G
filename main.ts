radio.onReceivedNumber(function (receivedNumber) {
    mano_oponente = receivedNumber
    confirmacion = true
    radio.sendValue("recibido", 1)
    if (listo_mostrar && confirmacion) {
        basic.pause(500)
        radio.sendString("mostrar")
    }
})
input.onGesture(Gesture.Shake, function () {
    mano = randint(1, 3)
    if (mano == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else if (mano == 2) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (mano == 3) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            # # . # #
            # # . # #
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    }
    radio.sendNumber(mano)
    radio.sendValue("listo", 1)
})
radio.onReceivedString(function (receivedString) {
    basic.showNumber(3)
    basic.pause(500)
    basic.showNumber(2)
    basic.pause(500)
    basic.showNumber(1)
    basic.pause(500)
    if (mano_oponente == mano) {
        basic.showIcon(IconNames.Asleep)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
    } else if (mano == 1 && mano_oponente == 3 || (mano == 3 && mano_oponente == 2 || mano == 2 && mano_oponente == 1)) {
        basic.showIcon(IconNames.Happy)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
    } else {
        basic.showIcon(IconNames.Sad)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funeral), music.PlaybackMode.InBackground)
    }
    listo_mostrar = false
    listo_mostrar = false
})
radio.onReceivedValue(function (name, value) {
    if (name == "listo" || name == "recibido") {
        listo_mostrar = true
        if (listo_mostrar && confirmacion) {
            basic.pause(500)
            radio.sendString("mostrar")
        }
    }
})
let mano = 0
let confirmacion = false
let mano_oponente = 0
let listo_mostrar = false
radio.setGroup(1)
listo_mostrar = false
listo_mostrar = false
