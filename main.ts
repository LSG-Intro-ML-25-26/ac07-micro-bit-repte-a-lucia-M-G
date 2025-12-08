function mostrar () {
    if (juez == 1) {
        if (resultado_final == 0) {
            basic.showIcon(IconNames.Asleep)
        } else if (resultado_final == 1) {
            basic.showIcon(IconNames.Happy)
        } else {
            basic.showIcon(IconNames.Sad)
        }
    } else {
        if (resultado_final == 0) {
            basic.showIcon(IconNames.Asleep)
        } else if (resultado_final == 2) {
            basic.showIcon(IconNames.Happy)
        } else {
            basic.showIcon(IconNames.Sad)
        }
    }
    ya_elegida = false
}
// Solo la placa juez
function resultado2 () {
    basic.showNumber(3)
    basic.pause(300)
    basic.showNumber(2)
    basic.pause(300)
    basic.showNumber(1)
    basic.pause(300)
    if (mi_mano == mano_oponente) {
        resultado_final = 0
    } else if (mi_mano == 1 && mano_oponente == 3 || (mi_mano == 3 && mano_oponente == 2 || mi_mano == 2 && mano_oponente == 1)) {
        resultado_final = 1
    } else {
        resultado_final = 2
    }
}
input.onGesture(Gesture.Shake, function () {
    mi_mano = randint(1, 3)
    ya_elegida = true
    if (mi_mano == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else if (mi_mano == 2) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (mi_mano == 3) {
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
    radio.sendValue("mano", mi_mano)
})
radio.onReceivedValue(function (name, value) {
    if (name == "mano") {
        mano_oponente = value
        if (juez == 1) {
            if (ya_elegida) {
                resultado2()
                radio.sendValue("resultado", resultado_final)
                mostrar()
            }
        }
    } else if (name == "resultado") {
        resultado_final = value
        mostrar()
    }
})
let mano_oponente = 0
let mi_mano = 0
let ya_elegida = false
let resultado_final = 0
let juez = 0
radio.setGroup(1)
juez = randint(0, 1)
