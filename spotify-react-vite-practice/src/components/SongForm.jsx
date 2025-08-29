import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SongForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    singer: '',
    composer: '',
    duration: '',
  });

  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    const titleRegex = /^[a-zA-Z0-9àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳýỵỷỹ ,.!?s-]+$/i;
    const singerComposerRegex = /^[A-Za-zÀ-ỹ0-9\s.-]{1,30}$/;
    const timeRegex = /^([0-1]\d|2[0-3]):[0-5]\d$/;

    // Title validation (kept from previous step)
    if (!form.title.trim()) {
      newErrors.title = 'Tên bài hát là bắt buộc.';
    } else if (/^\d+$/.test(form.title.trim())) {
      newErrors.title = 'Tên bài hát không được chỉ chứa số.';
    } else if (!titleRegex.test(form.title.trim())) {
      newErrors.title = 'Tên bài hát chứa ký tự không hợp lệ.';
    }

    // Singer validation using new regex
    if (!singerComposerRegex.test(form.singer)) {
        newErrors.singer = 'Yêu cầu 1-30 ký tự, bao gồm chữ, số, khoảng trắng, ., -';
    }

    // Composer validation using new regex
    if (!singerComposerRegex.test(form.composer)) {
        newErrors.composer = 'Yêu cầu 1-30 ký tự, bao gồm chữ, số, khoảng trắng, ., -';
    }

    // Duration validation
    if (!form.duration.trim()) {
      newErrors.duration = 'Thời gian phát là bắt buộc.';
    } else if (!timeRegex.test(form.duration.trim())) {
      newErrors.duration = 'Thời gian phải đúng định dạng hh:mm.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newSong = {
        name: form.title.trim(),
        singer: form.singer.trim(),
        composer: form.composer.trim(),
        time: form.duration.trim(),
        likes: 0,
        status: 'Lưu trữ',
      };
      onAdd(newSong);
      setForm({ title: '', singer: '', composer: '', duration: '' });
    }
  };

  return (
    <div className="p-3 border rounded shadow-sm">
      <h4>Đăng ký bài hát</h4>

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Tên bài hát</Form.Label>
          <Form.Control
            type="text"
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="singer">
          <Form.Label>Ca sĩ</Form.Label>
          <Form.Control
            type="text"
            value={form.singer}
            onChange={(e) => setField('singer', e.target.value)}
            isInvalid={!!errors.singer}
          />
          <Form.Control.Feedback type="invalid">
            {errors.singer}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="composer">
          <Form.Label>Nhạc sĩ</Form.Label>
          <Form.Control
            type="text"
            value={form.composer}
            onChange={(e) => setField('composer', e.target.value)}
            isInvalid={!!errors.composer}
          />
          <Form.Control.Feedback type="invalid">
            {errors.composer}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="duration">
          <Form.Label>Thời gian phát</Form.Label>
          <Form.Control
            type="text"
            value={form.duration}
            onChange={(e) => setField('duration', e.target.value)}
            isInvalid={!!errors.duration}
            placeholder="hh:mm"
          />
          <Form.Control.Feedback type="invalid">
            {errors.duration}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid">
          <Button type="submit">Đăng ký bài hát</Button>
        </div>
      </Form>
    </div>
  );
}