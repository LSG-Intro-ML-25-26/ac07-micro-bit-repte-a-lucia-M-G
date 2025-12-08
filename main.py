def on_received_number(receivedNumber):
    global mano_oponente, confirmacion
    mano_oponente = receivedNumber
    confirmacion = True
    radio.send_value("recibido", 1)
    if listo_mostrar and confirmacion:
        resultado()
radio.on_received_number(on_received_number)

def resultado():
    global listo_mostrar
    if mano_oponente == mano:
        basic.show_icon(IconNames.ASLEEP)
        music._play_default_background(music.built_in_playable_melody(Melodies.POWER_DOWN),
            music.PlaybackMode.IN_BACKGROUND)
    elif mano == 1 and mano_oponente == 3 or (mano == 3 and mano_oponente == 2 or mano == 2 and mano_oponente == 1):
        basic.show_icon(IconNames.HAPPY)
        music._play_default_background(music.built_in_playable_melody(Melodies.POWER_UP),
            music.PlaybackMode.IN_BACKGROUND)
    elif False:
        basic.show_icon(IconNames.SAD)
        music._play_default_background(music.built_in_playable_melody(Melodies.FUNERAL),
            music.PlaybackMode.IN_BACKGROUND)
    else:
        pass
    listo_mostrar = False
    listo_mostrar = False

def on_gesture_shake():
    global mano
    mano = randint(1, 3)
    if mano == 1:
        basic.show_leds("""
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            """)
    elif mano == 2:
        basic.show_leds("""
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            """)
    elif mano == 3:
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
    radio.send_number(mano)
    radio.send_value("listo", 1)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_received_value(name, value):
    global listo_mostrar
    if name == "listo" or name == "recibido":
        listo_mostrar = True
        if confirmacion:
            resultado()
radio.on_received_value(on_received_value)

mano = 0
confirmacion = False
mano_oponente = 0
listo_mostrar = False
radio.set_group(1)
listo_mostrar = False
listo_mostrar = False