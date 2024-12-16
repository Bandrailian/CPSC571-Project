'use server';

import { createUser } from "@/server/helpers/user";
import { UserSchemaType } from "@/types/user";

export async function createUserAction(data: UserSchemaType) {
    await createUser(data);
}