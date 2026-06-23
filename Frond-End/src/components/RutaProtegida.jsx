import { Navigate } from "react-router-dom";
import { authService } from "../services/api_auth";

/**
 * Envuelve una vista y verifica que el usuario tenga sesión activa y,
 * opcionalmente, que su rol esté permitido. Si no cumple, lo manda de
 * vuelta al Login (sin sesión) o a la vista que sí le corresponde
 * (sesión válida pero rol distinto).
 *
 * Uso:
 *   <Route path="/KPIs" element={
 *     <RutaProtegida rolesPermitidos={["administrador"]}>
 *       <KPIs />
 *     </RutaProtegida>
 *   } />
 */
function RutaProtegida({ children, rolesPermitidos }) {
  const usuario = authService.obtenerUsuarioActual();

  if (!authService.estaAutenticado() || !usuario) {
    return <Navigate to="/" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to={authService.rutaSegunRol(usuario.rol)} replace />;
  }

  return children;
}

export default RutaProtegida;
