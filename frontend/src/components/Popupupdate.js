import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, User, Mail, GraduationCap, FileText, Camera, AlertCircle, CheckCircle2 } from "lucide-react";
import { Modal, Button, Input, Select, Textarea, FieldLabel } from "./ui";
import { apiFetch } from "../config/api";
import { CLASS_OPTIONS, EMAIL_PATTERN, PASSWORD_PATTERN, PASSWORD_HINT } from "../config/constants";

const FIELD_META = {
  username: { title: "Update username", icon: User },
  email: { title: "Update email", icon: Mail },
  password: { title: "Change password", icon: Lock },
  class: { title: "Update class", icon: GraduationCap },
  bio: { title: "Update bio", icon: FileText },
  profilePicture: { title: "Update profile picture", icon: Camera },
};

const Popupupdate = ({ isOpen, closePopup, fieldType, updateUser }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setValue("");
      setFile(null);
      setCurrentPassword("");
      setNewPassword("");
      setError("");
      setSuccess("");
      setBusy(false);
    }
  }, [isOpen]);

  const meta = FIELD_META[fieldType] || { title: "Update", icon: User };

  const submitField = async () => {
    if (fieldType === "email" && !EMAIL_PATTERN.test(value)) {
      setError("Enter a valid email address.");
      return;
    }
    setBusy(true);
    try {
      await apiFetch("/profile", { method: "PATCH", body: { fieldType, value } });
      updateUser(fieldType, value);
      setSuccess("Updated successfully.");
      setError("");
    } catch (err) {
      setError(err.message || "Could not update. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const submitPassword = async () => {
    if (!PASSWORD_PATTERN.test(newPassword)) {
      setError("New password does not meet the requirements.");
      return;
    }
    setBusy(true);
    try {
      await apiFetch("/change-password", {
        method: "PATCH",
        body: { currentPassword, newPassword },
      });
      setSuccess("Password changed successfully.");
      setError("");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message || "Current password is incorrect.");
    } finally {
      setBusy(false);
    }
  };

  const submitPicture = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("profilePicture", file);
    setBusy(true);
    try {
      const res = await apiFetch("/profile-picture", { method: "PATCH", body: form });
      updateUser("profilePicture", res?.data?.profilePicture);
      setSuccess("Profile picture updated.");
      setError("");
    } catch (err) {
      setError(err.message || "Upload failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = () => {
    if (fieldType === "profilePicture") return submitPicture();
    if (fieldType === "password") return submitPassword();
    return submitField();
  };

  const disabled =
    busy ||
    (fieldType === "profilePicture" && !file) ||
    (fieldType === "password" && (!currentPassword.trim() || !newPassword.trim())) ||
    (fieldType !== "password" && fieldType !== "profilePicture" && !value.trim());

  const pwToggle = (shown, set) => (
    <button
      type="button"
      onClick={() => set((v) => !v)}
      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:text-white"
      aria-label={shown ? "Hide password" : "Show password"}
    >
      {shown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );

  return (
    <Modal open={isOpen} onClose={closePopup} title={meta.title} icon={meta.icon} maxWidth="max-w-md">
      <div className="space-y-4">
        {fieldType === "username" && (
          <div>
            <FieldLabel icon={User}>New username</FieldLabel>
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter new username" />
          </div>
        )}

        {fieldType === "email" && (
          <div>
            <FieldLabel icon={Mail}>New email</FieldLabel>
            <Input type="email" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter new email" />
          </div>
        )}

        {fieldType === "class" && (
          <Select
            label="Select class"
            icon={GraduationCap}
            value={value}
            onChange={setValue}
            options={CLASS_OPTIONS}
            placeholder="Choose your class"
          />
        )}

        {fieldType === "bio" && (
          <div>
            <FieldLabel icon={FileText}>New bio</FieldLabel>
            <Textarea rows={4} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Tell us about yourself…" />
          </div>
        )}

        {fieldType === "password" && (
          <>
            <div>
              <FieldLabel icon={Lock}>Current password</FieldLabel>
              <Input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                rightSlot={pwToggle(showCurrent, setShowCurrent)}
              />
            </div>
            <div>
              <FieldLabel icon={Lock}>New password</FieldLabel>
              <Input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                rightSlot={pwToggle(showNew, setShowNew)}
              />
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{PASSWORD_HINT}</p>
            </div>
          </>
        )}

        {fieldType === "profilePicture" && (
          <div>
            <FieldLabel icon={Camera}>New profile picture</FieldLabel>
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-8 text-center transition-colors hover:border-brand/50">
              <Camera className="h-8 w-8 text-brand" />
              <span className="text-sm font-medium text-white">
                {file ? file.name : "Click to upload an image"}
              </span>
              <span className="text-xs text-slate-500">PNG or JPG, up to 10MB</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
        )}
      </div>

      {(error || success) && (
        <div
          className={`mt-4 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm ${
            error
              ? "border-red-500/20 bg-red-500/10 text-red-300"
              : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
          }`}
        >
          {error ? <AlertCircle className="h-4 w-4 shrink-0" /> : <CheckCircle2 className="h-4 w-4 shrink-0" />}
          <span>{error || success}</span>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <Button className="flex-1" onClick={onSubmit} disabled={disabled}>
          {busy ? "Saving…" : "Save changes"}
        </Button>
        <Button variant="outline" className="flex-1" onClick={closePopup}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default Popupupdate;
