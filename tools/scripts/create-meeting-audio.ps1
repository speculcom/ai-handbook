$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$sampleDir = Join-Path $PSScriptRoot '../samples/meeting'
$taskSpeaker = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
    $taskSpeaker.SelectVoice('Microsoft David Desktop')
    $taskSpeaker.Rate = 0
    $format = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(16000,[System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen,[System.Speech.AudioFormat.AudioChannel]::Mono)
    $taskSpeaker.SetOutputToWaveFile((Join-Path $sampleDir 'fictional-meeting.wav'),$format)
    $taskSpeaker.Speak([System.IO.File]::ReadAllText((Join-Path $sampleDir 'tts-input.txt')))
} finally { $taskSpeaker.Dispose() }
