import {ContainerModule, interfaces} from 'inversify';
import {utilsCommonInjectableTypes} from './utilsCommonInjectableTypes';
import {Sequential} from './Sequential';

export const utilsCommonContainerModule = new ContainerModule((
    bind: interfaces.Bind,
) => {
    bind(utilsCommonInjectableTypes.Sequential).to(Sequential);
});
