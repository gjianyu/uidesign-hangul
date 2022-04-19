function play(x) {
    let audio_path = "http://127.0.0.1:8080/"
    switch(x) {
        case "ㄱ":
            audio_path += "hangul_audios/1_g.mp3"
            break;
        case "ㄴ":
            audio_path += "hangul_audios/2_n.mp3"
            break;
        case "ㅂ":
            audio_path += "hangul_audios/3_b.mp3"
            break;
        case "ㅅ":
            audio_path += "hangul_audios/4_s.mp3"
            break;
        case "ㅎ":
            audio_path += "hangul_audios/5_h.mp3"
            break;
        case "ㅏ":
            audio_path += "hangul_audios/6_ah.mp3"
            break;
        default:
            audio_path += syllable.audio
            break;
    }
    console.log(audio_path)
    let audio = new Audio(audio_path)
    audio.play()
}