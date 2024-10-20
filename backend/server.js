const express = require('express');
const XLSX = require('xlsx');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // 安装并使用 cors 中间件

const app = express();
const PORT = 5001;

// 允许跨域请求
app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json());

// 文件路径
const filePath = path.join(__dirname, 'data_Landlord.xlsx');

// 处理 POST 请求，将数据追加到 Excel 文件
app.post('/api/add-to-excel', (req, res) => {
  console.log('Received request:', req.body);  // 记录请求
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ message: 'Invalid data format' });
  }

  try {

    // 检查文件是否存在
    let workbook;
    if (fs.existsSync(filePath)) {
      // 如果文件存在，读取文件
      const fileBuffer = fs.readFileSync(filePath);
      workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    } else {
      // 如果文件不存在，创建一个新的工作簿
      workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet([['Address', 'Price', 'Size']]);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'HousingData');
    }

    // 获取工作表
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // 将新的数据追加到工作表
    data.forEach(row => {
      const newRow = [row.address, row.price, row.size];
      XLSX.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 });
    });

    // 将工作簿写入文件
    XLSX.writeFile(workbook, filePath);

    res.status(200).json({ message: 'Data successfully added to Excel' });
  } catch (error) {
    console.error('Error writing to Excel file:', error);
    res.status(500).json({ message: 'Failed to write to Excel file' });
  }
});


// 获取当前 Excel 文件中的数据
app.get('/api/get-housing-data', (req, res) => {
    const filePath = path.join(__dirname, 'data_Landlord.xlsx');
    console.log('Excel file path:', filePath);

    if (fs.existsSync(filePath)) {
    console.log('File exists');
    } else {
    console.log('File does not exist');
    }

    try {
        if (fs.existsSync(filePath)) {
          const workbook = XLSX.readFile(filePath);
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: ["address", "price", "size"]  // 确保按列名解析
          });
    
          console.log('Excel Data:', jsonData);  // 检查是否正确读取了数据
          res.status(200).json(jsonData);
        } else {
          console.log('Excel file not found.');
          res.status(200).json([]);
        }
      } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(500).json({ message: 'Failed to load housing data' });
      }
    });
  

  

// 删除房源数据并更新 Excel 文件
app.delete('/api/delete-housing-data', (req, res) => {
  const { address } = req.body;

  try {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    let jsonData = XLSX.utils.sheet_to_json(worksheet);

    // 根据地址过滤掉要删除的房源
    const updatedData = jsonData.filter(house => house.address !== address);

    // 检查是否有房源被删除
    if (updatedData.length === jsonData.length) {
      return res.status(404).json({ message: 'Housing not found' });
    }

    // 清空工作簿并将更新后的数据写回到 Excel 文件
    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(updatedData);
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'HousingData');
    XLSX.writeFile(newWorkbook, filePath); // 将更新后的数据写入 Excel 文件

    res.status(200).json({ message: 'Housing data deleted successfully' });
  } catch (error) {
    console.error('Error updating Excel file:', error);
    res.status(500).json({ message: 'Failed to delete housing data' });
  }
});


// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

