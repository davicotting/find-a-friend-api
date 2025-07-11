import "dotenv/config"
import * as zod from "zod"

const envValidateSchema = zod.object({
    PORT: zod.coerce.number().default(1111),
    DATABASE_URL: zod.url()
});

const _env = envValidateSchema.safeParse(process.env);

if(!_env.success){
    console.error('❌ Enviroment variables error', _env.error.format());
    throw new Error('❌ Enviroment variables error')
}

export const env = _env.data;