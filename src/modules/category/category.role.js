import {roles} from '../../middleware/auth.js'

export const endPoints = {
    create:[roles.Admin],
    get:[roles.User , roles.Admin],
    active:[roles.User],
    delete:[roles.Admin]
}