import { Flex, Spin } from 'antd';

const LoadingScreen = () => (
    <Flex align="center" justify="center" className="loading-screen">
      <Spin tip="Загрузка">
        <span />
      </Spin>
    </Flex>
  );

export default LoadingScreen;
