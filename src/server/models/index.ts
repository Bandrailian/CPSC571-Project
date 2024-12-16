import { DATABASE_CONNECTION } from "@/server/helpers/database";
import { UserModel } from "@/server/models/user";
import { AssessmentModel } from "@/server/models/assessment";

async function ModelInitializer<T>(arg: T): Promise<T> {
    if (DATABASE_CONNECTION.readyState === 1)
        return arg;
    await DATABASE_CONNECTION.asPromise();
    return arg;
}

export const User = ModelInitializer(UserModel);
export const Assessment = ModelInitializer(AssessmentModel);