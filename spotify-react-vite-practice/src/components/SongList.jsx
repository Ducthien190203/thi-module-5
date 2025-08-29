import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SongList({ songs, loading, onSelect, search, setSearch, onUpdateStatus }) {
  
  const handlePublish = (e, songId) => {
    e.stopPropagation();
    onUpdateStatus(songId, 'Công khai');
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Kho nhạc</h3>
        <Form.Control
          style={{ width: 300 }}
          placeholder="Tìm theo tên bài hát..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên bài hát</th>
            <th>Ca sĩ</th>
            <th>Thời gian phát</th>
            <th>Lượt yêu thích</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center">Đang tải...</td>
            </tr>
          ) : songs.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center">Không có bài hát.</td>
            </tr>
          ) : (
            songs.map((s, idx) => (
              <tr key={s.id} style={{ cursor: 'pointer' }} onClick={() => onSelect(s)}>
                <td>{idx + 1}</td>
                <td>{s.name}</td>
                <td>{s.singer}</td>
                <td>{s.time}</td>
                <td>{s.likes}</td>
                <td>{s.status}</td>
                <td>
                  {s.status === 'Lưu trữ' && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={(e) => handlePublish(e, s.id)}
                    >
                      Công khai
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}