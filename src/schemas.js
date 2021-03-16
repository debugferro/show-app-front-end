import { schema } from 'normalizr'


export const userEntity = new schema.Entity('users')
export const showEntity = new schema.Entity('shows')

export const scheduledShowEntity = new schema.Entity('scheduled_shows')
