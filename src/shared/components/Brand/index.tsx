import { MessageOutlined } from '@ant-design/icons';

import classes from './index.module.less';

const Brand = () => (
    <div className={classes.brand}>
      <span className={classes.icon}>
        <MessageOutlined />
      </span>
      <span>
        MAX <span className={classes.caption}>/ чат</span>
      </span>
    </div>
  );

export default Brand;
