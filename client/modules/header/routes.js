

import MainLayout from '/client/modules/core/components/main_layout';

export default function (injectDeps) {
  const MainLayoutCtx = injectDeps(MainLayout);

  // FlowRouter.route('', {
  //   name: '',
  //   action() {
  //     mount(MainLayoutCtx, {
  //       content: () => (< />)
  //     });
  //   }
  // });
}
