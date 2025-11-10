import { Request, Response } from "express";
import * as profileService from "../service/profileService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { email, pictureDispl } = req.body;
  if (!email || !pictureDispl) {
    return res.status(401).json({ message: "Email and picture are required" });
  }
  try {
    const existingProfile = await profileService.findProfileByEmail(email);
    if (existingProfile) {
      return res.status(409).json({ message: "Email is already in use" });
    }
    const profile = await profileService.CreateProfile(email, pictureDispl);
    res
      .status(201)
      .json({
        message: "Profile registered successfully",
        profileId: profile.id,
      });
  } catch (error) {
    res.status(500).json({ message: "Error registering the profile" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, pictureDispl } = req.body;
  if (!email || !pictureDispl) {
    return res.status(400).json({ message: "Email and picture are required" });
  }
  try {
    const profile = await profileService.findProfileByEmail(email);
    if (!profile) {
      return res.status(409).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(pictureDispl, profile.pictureDispl);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid picture" });
    }
    const payload = { profileId: profile.id, email: profile.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
