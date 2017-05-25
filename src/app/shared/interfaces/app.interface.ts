import { IRUser } from './auth.interface';
import { IRProjects } from './project.interface';

export interface IRProfile extends IRUser, IRProjects {
}
