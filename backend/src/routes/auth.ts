import express from "express";

const router = express.Router();

router.post("/register-admin", async (req, res) => {
  const { email, password } = req.body;
  const supabase = req.supabase;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) return res.status(400).json({ error: error.message });

  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([{ email, role: "admin", id: data.user?.id }])
    .select();

  if (userError) return res.status(400).json({ error: userError.message });

  res.json({ message: "Admin başarıyla kaydedildi", user: userData });
});

export default router;
