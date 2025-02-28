import path from "node:path";
import {NativeConnection, Worker} from "@temporalio/worker";
import {pool} from '../lib/db/index.js'
import dotenv from 'dotenv'
import {createActivities} from "./activities.js";

dotenv.config()


async function startWorker (): Promise<void> {
    let connection = await NativeConnection.connect({
        address: process.env.TEMPORAL_URL,
    })


    console.log(path.resolve(import.meta.dirname, './workflows/index.ts'))

    let worker = await Worker.create({
        connection,
        buildId: '1',
        namespace: process.env.TEMPORAL_NAMESPACE,
        taskQueue: process.env.TEMPORAL_TASK_QUEUE ?? 'default',

        ...(
            process.env.NODE_ENV === "development"
                ? {
                    workflowsPath: path.resolve(import.meta.dirname, './workflows/index.ts')
                }
                : {
                    workflowBundle: {
                        codePath: path.resolve(import.meta.dirname, '../workflows.js')
                    }
                }
        ),

        activities: createActivities({
            pool: pool
        })
    })

    process.on('uncaughtException', function handleUncaughtException (err, origin) {
        gracefulShutdown()
    })

    process.on('unhandledRejection', function handleUnhandledRejection (err, promise) {
        gracefulShutdown()
    })

    process.on('SIGINT', handleSignal)
    process.on('SIGTERM', handleSignal)

    await worker.run()
    await connection.close()

    function handleSignal (signal: NodeJS.Signals): void {
        gracefulShutdown()
    }

    function gracefulShutdown (): void {
        console.info('Shutting down')
    }
}

void startWorker()
