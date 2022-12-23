
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.after(10)#b64Encode.finished": { type: "xstate.after(10)#b64Encode.finished" };
"xstate.after(10)#b64Encode.inactive": { type: "xstate.after(10)#b64Encode.inactive" };
"xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk": { type: "xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk" };
"xstate.after(1000)#b64Encode.createInputChunks.autoPlayIdle": { type: "xstate.after(1000)#b64Encode.createInputChunks.autoPlayIdle" };
"xstate.after(1000)#b64Encode.createInputChunks.createLastPaddedChunk": { type: "xstate.after(1000)#b64Encode.createInputChunks.createLastPaddedChunk" };
"xstate.after(1000)#b64Encode.createInputChunks.explainLastPaddedChunk": { type: "xstate.after(1000)#b64Encode.createInputChunks.explainLastPaddedChunk" };
"xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk": { type: "xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk" };
"xstate.after(1000)#b64Encode.createOutputChunks.autoPlayIdle": { type: "xstate.after(1000)#b64Encode.createOutputChunks.autoPlayIdle" };
"xstate.after(1000)#b64Encode.createOutputChunks.createLastPaddedChunk": { type: "xstate.after(1000)#b64Encode.createOutputChunks.createLastPaddedChunk" };
"xstate.after(1000)#b64Encode.createOutputChunks.explainLastPaddedChunk": { type: "xstate.after(1000)#b64Encode.createOutputChunks.explainLastPaddedChunk" };
"xstate.after(1000)#b64Encode.createOutputChunks.explainPadCharacter": { type: "xstate.after(1000)#b64Encode.createOutputChunks.explainPadCharacter" };
"xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte": { type: "xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte" };
"xstate.after(1000)#b64Encode.encodeInput.explainByteMapping": { type: "xstate.after(1000)#b64Encode.encodeInput.explainByteMapping" };
"xstate.after(1000)#b64Encode.encodeInput.idle": { type: "xstate.after(1000)#b64Encode.encodeInput.idle" };
"xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64": { type: "xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64" };
"xstate.after(1000)#b64Encode.encodeOutput.idle": { type: "xstate.after(1000)#b64Encode.encodeOutput.idle" };
"xstate.after(1000)#b64Encode.validateInputText.error": { type: "xstate.after(1000)#b64Encode.validateInputText.error" };
"xstate.after(1000)#b64Encode.validateInputText.success": { type: "xstate.after(1000)#b64Encode.validateInputText.success" };
"xstate.after(1000)#b64Encode.verifyResults": { type: "xstate.after(1000)#b64Encode.verifyResults" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "clearResetFlag": "xstate.after(10)#b64Encode.inactive";
"encode": "";
"generateBase64Maps": "";
"generateByteMaps": "";
"getCurrentBase64Char": "GO_TO_NEXT_STEP" | "GO_TO_PREV_STEP" | "RESUME_AUTO_PLAY" | "STOP_AUTO_PLAY" | "xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64" | "xstate.after(1000)#b64Encode.encodeOutput.idle";
"getCurrentByte": "GO_TO_NEXT_STEP" | "GO_TO_PREV_STEP" | "RESUME_AUTO_PLAY" | "STOP_AUTO_PLAY" | "xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte" | "xstate.after(1000)#b64Encode.encodeInput.idle";
"getCurrentInputChunk": "GO_TO_NEXT_STEP" | "GO_TO_PREV_STEP" | "RESUME_AUTO_PLAY" | "STOP_AUTO_PLAY" | "xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk" | "xstate.after(1000)#b64Encode.createInputChunks.autoPlayIdle";
"getCurrentOutputChunk": "GO_TO_NEXT_STEP" | "GO_TO_PREV_STEP" | "RESUME_AUTO_PLAY" | "STOP_AUTO_PLAY" | "xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk" | "xstate.after(1000)#b64Encode.createOutputChunks.autoPlayIdle";
"mapNextBase64Char": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64";
"mapNextByte": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte";
"mapNextInputChunk": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk";
"mapNextOutputChunk": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk";
"mapPreviousBase64Char": "GO_TO_PREV_STEP";
"mapPreviousByte": "GO_TO_PREV_STEP";
"mapPreviousInputChunk": "GO_TO_PREV_STEP";
"mapPreviousOutputChunk": "GO_TO_PREV_STEP";
"resetContext": "GO_TO_FIRST_STEP" | "GO_TO_PREV_STEP" | "RESET" | "xstate.after(1000)#b64Encode.validateInputText.error" | "xstate.init";
"resetInput": "RESET";
"resetNoBase64CharsRemaining": "GO_TO_PREV_STEP";
"resetNoBytesRemaining": "GO_TO_PREV_STEP";
"resetNoInputChunksRemaining": "GO_TO_PREV_STEP";
"resetNoOutputChunksRemaining": "GO_TO_PREV_STEP";
"resetRemainingBase64Chars": "GO_TO_PREV_STEP" | "done.state.b64Encode.createOutputChunks";
"resetRemainingBytes": "GO_TO_PREV_STEP" | "done.state.b64Encode.validateInputText";
"resetRemainingInputChunks": "GO_TO_PREV_STEP" | "done.state.b64Encode.encodeInput";
"resetRemainingOutputChunks": "GO_TO_PREV_STEP" | "done.state.b64Encode.createInputChunks";
"setFlagSkipDemo": "GO_TO_LAST_STEP" | "SKIP_DEMO";
"startAutoPlay": "RESUME_AUTO_PLAY" | "START_AUTOPLAY";
"stopAutoPlay": "GO_TO_FIRST_STEP" | "GO_TO_PREV_STEP" | "RESET" | "STOP_AUTO_PLAY" | "xstate.after(10)#b64Encode.finished" | "xstate.after(1000)#b64Encode.validateInputText.error" | "xstate.init";
"updateContextForLastStep": "GO_TO_PREV_STEP" | "done.state.b64Encode.encodeOutput";
"validate": "GO_TO_PREV_STEP" | "SKIP_DEMO" | "START_AUTOPLAY" | "UPDATE_TEXT" | "VALIDATE_TEXT";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "allBase64CharsRemaining": "GO_TO_PREV_STEP";
"allBytesRemaining": "GO_TO_PREV_STEP";
"allInputChunksRemaining": "GO_TO_PREV_STEP";
"allOutputChunksRemaining": "GO_TO_PREV_STEP";
"autoPlayDisabled": "GO_TO_FIRST_STEP" | "GO_TO_LAST_STEP" | "GO_TO_NEXT_STEP" | "GO_TO_PREV_STEP" | "RESET" | "RESUME_AUTO_PLAY";
"autoPlayEnabled": "" | "STOP_AUTO_PLAY" | "xstate.after(10)#b64Encode.finished" | "xstate.after(1000)#b64Encode.createInputChunks.createLastPaddedChunk" | "xstate.after(1000)#b64Encode.createInputChunks.explainLastPaddedChunk" | "xstate.after(1000)#b64Encode.createOutputChunks.createLastPaddedChunk" | "xstate.after(1000)#b64Encode.createOutputChunks.explainLastPaddedChunk" | "xstate.after(1000)#b64Encode.createOutputChunks.explainPadCharacter" | "xstate.after(1000)#b64Encode.encodeInput.explainByteMapping" | "xstate.after(1000)#b64Encode.encodeInput.idle" | "xstate.after(1000)#b64Encode.encodeOutput.idle" | "xstate.after(1000)#b64Encode.validateInputText.success" | "xstate.after(1000)#b64Encode.verifyResults";
"base64CharsRemaining": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64";
"bytesRemaining": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte";
"currentInputChunkIsPadded": "GO_TO_PREV_STEP";
"currentOutputChunkIsPadded": "GO_TO_PREV_STEP";
"defaultSettingsChanged": "RESET";
"finalPaddedInputChunkRemaining": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk";
"finalPaddedOutputChunkRemaining": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk";
"formResetRequested": "xstate.after(10)#b64Encode.inactive";
"hasPreviousBase64Char": "GO_TO_PREV_STEP";
"hasPreviousByte": "GO_TO_PREV_STEP";
"hasPreviousInputChunk": "GO_TO_PREV_STEP";
"hasPreviousOutputChunk": "GO_TO_PREV_STEP";
"inputChunksRemaining": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk";
"inputTextIsInvalid": "";
"lastChunkIsPadded": "GO_TO_PREV_STEP";
"noBase64CharsRemaining": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.encodeOutput.autoPlayEncodeBase64";
"noBytesRemaining": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.encodeInput.autoPlayEncodeByte";
"noInputChunksRemaining": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.createInputChunks.autoPlayCreateInputChunk";
"noOutputChunksRemaining": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk";
"onlyOnePaddedChunk": "GO_TO_NEXT_STEP" | "STOP_AUTO_PLAY" | "xstate.after(1000)#b64Encode.createInputChunks.autoPlayIdle" | "xstate.after(1000)#b64Encode.createOutputChunks.autoPlayIdle";
"outputChunksRemaining": "GO_TO_NEXT_STEP" | "xstate.after(1000)#b64Encode.createOutputChunks.autoPlayCreateOutputChunk";
"yesSkipDemo": "" | "done.state.b64Encode.createInputChunks" | "done.state.b64Encode.createOutputChunks" | "done.state.b64Encode.encodeInput" | "done.state.b64Encode.encodeOutput" | "done.state.b64Encode.validateInputText";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "createInputChunks" | "createInputChunks.autoPlayCreateInputChunk" | "createInputChunks.autoPlayIdle" | "createInputChunks.createInputChunk" | "createInputChunks.createLastPaddedChunk" | "createInputChunks.createdAllInputChunks" | "createInputChunks.explainLastPaddedChunk" | "createInputChunks.idle" | "createInputChunks.regularIdle" | "createOutputChunks" | "createOutputChunks.autoPlayCreateOutputChunk" | "createOutputChunks.autoPlayIdle" | "createOutputChunks.createLastPaddedChunk" | "createOutputChunks.createOutputChunk" | "createOutputChunks.createdAllOutputChunks" | "createOutputChunks.explainLastPaddedChunk" | "createOutputChunks.explainPadCharacter" | "createOutputChunks.idle" | "createOutputChunks.regularIdle" | "encodeInput" | "encodeInput.autoPlayEncodeByte" | "encodeInput.encodeByte" | "encodeInput.encodingComplete" | "encodeInput.explainByteMapping" | "encodeInput.idle" | "encodeOutput" | "encodeOutput.autoPlayEncodeBase64" | "encodeOutput.encodeBase64" | "encodeOutput.encodingComplete" | "encodeOutput.idle" | "finished" | "inactive" | "validateInputText" | "validateInputText.error" | "validateInputText.success" | "validateInputText.validate" | "validateInputText.validationComplete" | "verifyResults" | { "createInputChunks"?: "autoPlayCreateInputChunk" | "autoPlayIdle" | "createInputChunk" | "createLastPaddedChunk" | "createdAllInputChunks" | "explainLastPaddedChunk" | "idle" | "regularIdle";
"createOutputChunks"?: "autoPlayCreateOutputChunk" | "autoPlayIdle" | "createLastPaddedChunk" | "createOutputChunk" | "createdAllOutputChunks" | "explainLastPaddedChunk" | "explainPadCharacter" | "idle" | "regularIdle";
"encodeInput"?: "autoPlayEncodeByte" | "encodeByte" | "encodingComplete" | "explainByteMapping" | "idle";
"encodeOutput"?: "autoPlayEncodeBase64" | "encodeBase64" | "encodingComplete" | "idle";
"validateInputText"?: "error" | "success" | "validate" | "validationComplete"; };
        tags: never;
      }
  