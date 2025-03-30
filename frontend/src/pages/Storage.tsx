import React, { useEffect, useState, useRef } from "react";
import { getFiles, deleteFile, uploadFile, downloadFile } from "../api/files";
import axios from "../api/axiosConfig";
import { toast } from "react-toastify";

type FileItem = {
  id: string;
  display_name: string;
  comment: string;
  file_size: number;
  upload_time: string;
  last_downloaded: string | null;
  shared_link?: string;
};

const Storage = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const result = await getFiles();
      setFiles(result);
    } catch (err) {
      toast.error("Ошибка при загрузке списка файлов");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.warning("Выберите файл");
      return;
    }

    try {
      const res = await uploadFile(file, comment);
      setFiles([...files, res.data]);
      setFile(null);
      setComment("");
      setUploadSuccess(true);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success("Файл успешно загружен!");
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      toast.error("Ошибка при загрузке файла");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFile(id);
      setFiles(files.filter((file) => file.id !== id));
      toast.success("Файл удалён");
    } catch (err) {
      toast.error("Ошибка при удалении файла");
    }
  };

  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [newNames, setNewNames] = useState<{ [key: string]: string }>({});

  const handleUpdateComment = async (fileId: string) => {
    try {
      await axios.post(`/api/files/${fileId}/update_description/`, {
        new_description: newComments[fileId],
      });
      toast.success("Комментарий обновлён");
      fetchData();
    } catch (err) {
      toast.error("Не удалось обновить комментарий");
    }
  };

  const handleRename = async (fileId: string) => {
    try {
      await axios.post(`/api/files/${fileId}/rename/`, {
        new_name: newNames[fileId],
      });
      toast.success("Имя файла обновлено");
      fetchData();
    } catch (err) {
      toast.error("Не удалось переименовать файл");
    }
  };

  const formatDate = (dateString?: string | null) =>
    dateString ? new Date(dateString).toLocaleString("ru-RU") : "—";

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Ссылка скопирована ✅"))
      .catch(() => toast.error("Не удалось скопировать ссылку"));
  };

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  return (
    <div className="container">
      <h2>Мои файлы</h2>

      <form className="upload-form" onSubmit={handleUpload}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
        <input
          type="text"
          placeholder="Комментарий к файлу"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Загрузить</button>
      </form>

      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <strong>{file.display_name}</strong> <br />
            Комментарий: {file.comment || "—"} <br />
            Размер: {(file.file_size / 1024).toFixed(2)} КБ <br />
            Загружен: {formatDate(file.upload_time)} <br />
            Последнее скачивание: {formatDate(file.last_downloaded)} <br />

            {file.shared_link && (
              <div className="copy-link-block">
                <strong style={{ fontSize: "18px", color: "#88ACBC" }}>
                  Публичная ссылка:
                </strong>
                <button
                  className="copy-btn"
                  onClick={() =>
                    copyToClipboard(
                      `${window.location.origin}/api/files/access/${file.shared_link}/`
                    )
                  }
                >
                  Скопировать ссылку
                </button>
              </div>
            )}

            <div className="file-actions">
              <div className="file-buttons">
                <button onClick={() => downloadFile(file.id, file.display_name)}>
                  Скачать
                </button>
                <button onClick={() => handleDelete(file.id)}>Удалить</button>
              </div>

              <div className="file-edit">
                <div className="form-line">
                  <input
                    type="text"
                    placeholder="Новый комментарий"
                    value={newComments[file.id] || ""}
                    onChange={(e) =>
                      setNewComments({ ...newComments, [file.id]: e.target.value })
                    }
                  />
                  <button onClick={() => handleUpdateComment(file.id)}>
                    Обновить комментарий
                  </button>
                </div>
                <div className="form-line">
                  <input
                    type="text"
                    placeholder="Новое имя файла"
                    value={newNames[file.id] || ""}
                    onChange={(e) =>
                      setNewNames({ ...newNames, [file.id]: e.target.value })
                    }
                  />
                  <button onClick={() => handleRename(file.id)}>Переименовать</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Storage;
