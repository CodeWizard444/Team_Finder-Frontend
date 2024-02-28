import React from 'react';
import { MdMail, MdLock} from 'react-icons/md';
import { IoIosPerson } from 'react-icons/io';
import styles from './Login.module.css'; // Import CSS module

const Login = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={`${styles['form-box']} ${styles['login']}`}>
                    <h2>Login</h2>
                    <form action="home.html">
                        <div className={styles['input-box']}>
                            <span className={styles.icon}><IoIosPerson /></span>
                            <input type="text" required />
                            <label>Name</label>
                        </div>
                        <div className={styles['input-box']}>
                            <span className={styles.icon}><MdMail /></span>
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <div className={styles['input-box']}>
                            <span className={styles.icon}><MdLock /></span>
                            <input type="password" required />
                            <label>Password</label>
                        </div>
                        <div className={styles['remember-forgot']}>
                            <label><input type="checkbox" />Remember me</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" className={styles.btn}>Login</button>
                        <div className={styles['login-register']}>
                            <p>Don't have an account?
                                <a href="#" className={styles['register-link']}>Register</a>
                            </p>
                        </div>
                    </form>
                </div>

                <div className={`${styles['form-box']} ${styles['register']}`}>
                    <h2>Registration</h2>
                    <form action="home.html">
                        <div className={styles['input-box']}>
                            <span className={styles.icon}><IoIosPerson /></span>
                            <input type="text" required />
                            <label>Name</label>
                        </div>
                        <div className={styles['input-box']}>
                            <span className={styles.icon}><MdMail /></span>
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <div className={styles['input-box']}>
                            <span className={styles.icon}><MdLock /></span>
                            <input type="password" required />
                            <label>Password</label>
                        </div>
                        <div className={styles['remember-forgot']}>
                            <label><input type="checkbox" />I agree with the term & conditions</label>
                        </div>
                        <button type="submit" className={styles.btn}>Register</button>
                        <div className={styles['login-register']}>
                            <p>Already have an account?
                                <a href="#" className={styles['login-link']}>Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
