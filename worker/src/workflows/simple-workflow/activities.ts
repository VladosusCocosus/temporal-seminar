import {Options} from "../../types/activity-options.js";


export function simpleWorkflowActivities(options: Options)  {
    return {
        async simpleActivity (randomNumb: number) {
            return {
                numb: randomNumb,
                success: true
            }
        }
    }
}
