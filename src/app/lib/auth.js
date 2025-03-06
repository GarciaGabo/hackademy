import { auth, createUserWithEmailAndPassword, googleProvider } from './firebase';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";

// Funcion para autenticacion persistente
export const useAuthState = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
};

// Función para iniciar sesión con correo y contraseña
export const loginWithEmailPassword = async (email, password) => {
  const auth = getAuth();

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error al iniciar sesión: ", error.message);
    throw error;
  }
};

// Función para registrar usuario con correo y contraseña
export const registerWithEmailPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    let errorMessage = 'Error desconocido al registrar el usuario';

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'El correo electrónico no es válido';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'El correo electrónico ya está registrado';
        break;
      case 'auth/weak-password':
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
        break;
      case 'auth/missing-android-pkg-name':
        errorMessage = 'El paquete de la aplicación Android está faltando';
        break;
      case 'auth/missing-continue-uri':
        errorMessage = 'La URI de continuación está faltando';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'La operación no está permitida';
        break;
      case 'auth/timeout':
        errorMessage = 'La solicitud ha superado el tiempo de espera';
        break;
      default:
        errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};

// Función para iniciar sesión con Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Usuario autenticado con Google: ", user);
  } catch (error) {
    console.error("Error al iniciar sesión con Google: ", error.message);
    throw error;
  }
};

// Función para cerrar sesión
export const logout = async () => {
  const auth = getAuth();

  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión: ", error.message);
    throw error;
  }
};
