let mano = 0
input.onGesture(Gesture.Shake, function () {
    mano = randint(1, 3)
    if (mano == 1) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (mano == 2) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.showIcon(IconNames.Scissors)
    }
})
