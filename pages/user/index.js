import Link from 'umi/link'
import router from 'umi/router'
import styles from './index.css';

const user=[{id:1,name:'tom'},{id:2,name:'jerry'}]

export default function() {
  return (
    <div className={styles.normal}>
      <h1>用户列表</h1>
      <ul>
        {
          user.map(u=>(
            <li key={u.id} onClick={()=>router.push(`/user/${u.id}`)}>{u.name}</li>
          ))
        }
      </ul>
    </div>
  );
}
