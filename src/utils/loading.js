import { ElLoading } from 'element-plus';

let loadingInstance;

const startLoading = () => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0)',
  });
};

const endLoading = () => {
  loadingInstance.close();
};

let needLoadingRequestCount = 0;
export const showLoading = () => {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};

export const hideLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};
