import { $log } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./Server";


async function bootstrap() {
  try {
    $log.info("Starting server...");
    const platform = await PlatformExpress.bootstrap(Server);

    await platform.listen();

    //queue
    // const queueService = platform.injector.get<QueueService>(QueueService)


    // Gracefully shut down, close connections to Database
    // Add any other processes that must be shut down here before process is closed
    process.on("SIGINT", async () => {
      $log.info("SIGINT signal received.");
      await platform.stop();
      process.exit(0);
    });


    $log.info("Server initialized");
  } catch (er) {
    $log.error(`error while starting backend service ...`);
    $log.error(er);
    process.exit(1)
  }
}

bootstrap();

