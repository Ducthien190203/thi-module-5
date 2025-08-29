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
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    // Title validation
    if (!form.title.trim()) {
      newErrors.title = 'Tên bài hát là bắt buộc.';
    } else if (/^\d+$/.test(form.title.trim())) {
      newErrors.title = 'Tên bài hát không được chỉ chứa số.';
    } else if (!/^[\p{L}\d ,.!?s-]+$/u.test(form.title.trim())) {
      newErrors.title = 'Tên bài hát chứa ký tự không hợp lệ.';
    }

    // Singer validation
    if (!form.singer.trim()) {
      newErrors.singer = 'Tên ca sĩ là bắt buộc.';
    } else if (form.singer.length > 30) {
      newErrors.singer = 'Tên ca sĩ không được quá 30 ký tự.';
    } else if (!/^[\p{L}s]+$/u.test(form.singer.trim())) {
      newErrors.singer = 'Tên ca sĩ chỉ được chứa chữ cái và khoảng trắng.';
    }

    // Composer validation
    if (!form.composer.trim()) {
      newErrors.composer = 'Tên nhạc sĩ là bắt buộc.';
    } else if (form.composer.length > 30) {
      newErrors.composer = 'Tên nhạc sĩ không được quá 30 ký tự.';
    } else if (!/^[\p{L}s]+$/u.test(form.composer.trim())) {
      newErrors.composer = 'Tên nhạc sĩ chỉ được chứa chữ cái và khoảng trắng.';
    }

    // Duration validation
    if (!form.duration.trim()) {
      newErrors.duration = 'Thời gian phát là bắt buộc.';
    } else if (!/^([0-1]\d|2[0-3]):[0-5]\d$/.test(form.duration.trim())) {
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
      // Reset form
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
            maxLength={31} // Allow typing 31st char to show error
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
            maxLength={31}
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
          <Button type="submit">Thêm bài hát</Button>
        </div>
      </Form>
    </div>
  );
}