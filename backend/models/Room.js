import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      default: "Technical Interview",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    language: {
      type: String,
      default: "cpp",
    },
    code: {
      type: String,
      default: `#include <bits/stdc++.h>
using namespace std;
int main() {
    return 0;
}`,
    },
    status: {
      type: String,
      enum: ["active", "ended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);
const Room = mongoose.model("Room", roomSchema);
export default Room;
