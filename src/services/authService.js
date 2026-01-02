// Fake database using localStorage (JSON)

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || []
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users))
}

export async function registerUser(name, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers()

      const existingUser = users.find(u => u.email === email)
      if (existingUser) {
        reject("User already exists")
        return
      }

      const newUser = {
        id: Date.now(),
        name,      
        email,     
        password
      }

      users.push(newUser)
      saveUsers(users)

      resolve({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      })
    }, 500)
  })
}


export async function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers()

      const user = users.find(
        u => u.email === email && u.password === password
      )

      if (!user) {
        reject("Invalid credentials")
        return
      }

      resolve({
        id: user.id,
        name: user.name,    
        email: user.email
      })
    }, 500)
  })
}

