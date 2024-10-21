import UnrealSpeechAPI  from "unrealspeech";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { text, voice } = body;

    const unrealSpeech = new UnrealSpeechAPI(process.env.UNREAL_SPEECH_API_KEY);

    console.log(text, voice);

    const taskId = await unrealSpeech.createSynthesisTask(text, voice);

    while (true) {
      const status = await unrealSpeech.getSynthesisTaskStatus(taskId);
      if (status.TaskStatus === "completed") {
        console.log(status);
        return { status };
      } else if (status.TaskStatus === "failed") {
        throw new Error("Synthesis task failed.");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error(error);
    return { error: error.message || "An error occurred" };
  }
});


