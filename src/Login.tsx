import React from "react"
import Microsoft from "./assets/microsoft.svg"
import Google from "./assets/google.svg"

interface LoginProps {
  user: string
  roles: string[]
}

const Login: React.FC<LoginProps> = ({ user, roles }) => {
  return (
    <div className="text-center">
      <UserBox user={user} roles={roles} />
      {user === "Anonymous user" ? (
        <SignInOptions />
      ) : (
        <a href="/.auth/logout">Sign out</a>
      )}
    </div>
  )
}

const UserBox: React.FC<LoginProps> = ({ user, roles }) => {
  return (
    <p className="mt-2">
      Signed in as <strong>{user}</strong> with{" "}
      {roles.length > 0 ? `roles: ${roles}` : `no custom roles`}
    </p>
  )
}

const SignInOptions: React.FC = () => {
  return (
    <div>
      <a href="/.auth/login/aad" className="mr-2">
        <img src={Microsoft} className="mr-2" />
      </a>
      <a href="/.auth/login/google" className="mr-2">
        <img src={Google} className="mr-2" />
      </a>
    </div>
  )
}

export default Login
