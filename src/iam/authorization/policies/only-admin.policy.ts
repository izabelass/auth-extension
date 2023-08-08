import { Injectable } from '@nestjs/common';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';
import { PolicyHandler } from './interfaces/policy-handler.interface';
import { Policy } from './interfaces/policy.interface';
import { PolicyHandlerStorage } from './policy-handlers.storage';

export class OnlyAdminPolicy implements Policy {
  name = 'OnlyAdmin';
}

//ideally should be created at another file alongside this one
//with the name only-admin-policy.handler.ts
@Injectable()
export class OnlyAdminPolicyHandler implements PolicyHandler<OnlyAdminPolicy> {
  constructor(private readonly policyHandlerStorage: PolicyHandlerStorage) {
    this.policyHandlerStorage.add(OnlyAdminPolicy, this);
  }

  async handle(policy: OnlyAdminPolicy, user: ActiveUserData): Promise<void> {
    const isContributor = user.role.includes('regular');
    if (!isContributor) {
      throw new Error('User is not asasass contributor');
    }
  }
}
