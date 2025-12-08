def mostrar():
    if juez == 1:
        if resultado2 == 0:
            basic.show_icon(IconNames.ASLEEP)
        elif resultado2 == 1:
            basic.show_icon(IconNames.HAPPY)
        else:
            basic.show_icon(IconNames.SAD)
    else:
        if resultado_recibido == 0:
            basic.show_icon(IconNames.ASLEEP)
        elif resultado_recibido == 2:
            basic.show_icon(IconNames.HAPPY)
        else:
            basic.show_icon(IconNames.SAD)
def resultado():
    global resultado2
    basic.show_number(3)
    basic.pause(500)
    basic.show_number(2)
    basic.pause(500)
    basic.show_number(1)
    basic.pause(500)
    if mi_mano == mano_oponente:
        resultado2 = 0
    elif mi_mano == 1 and mano_oponente == 3 or (mi_mano == 3 and mano_oponente == 2 or mi_mano == 2 and mano_oponente == 1):
        resultado2 = 1
    else:
        resultado2 = 2

def on_gesture_shake():
    global mi_mano
    mi_mano = randint(1, 3)
    if mi_mano == 1:
        basic.show_leds("""
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            """)
    elif mi_mano == 2:
        basic.show_leds("""
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            """)
    elif mi_mano == 3:
        basic.show_leds("""
            # . . . #
            . # . # .
            . . # . .
            # # . # #
            # # . # #
            """)
    else:
        basic.show_leds("""
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            """)
    radio.send_value(mano, mi_mano)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_received_value(name, value):
    global mano_oponente, esperando_oponente, resultado_recibido
    if name == mano:
        if juez == 1:
            mano_elegida = 0
            mano_oponente = value
            if mano_elegida:
                resultado()
                radio.send_number(resultado2)
            else:
                esperando_oponente = True
        else:
            resultado_recibido = value
            mostrar()
radio.on_received_value(on_received_value)

esperando_oponente = False
mano = ""
mano_oponente = 0
mi_mano = 0
resultado_recibido = 0
resultado2 = 0
juez = 0
radio.set_group(1)
juez = randint(0, 1)
listo_mostrar = False
listo_mostrar = False